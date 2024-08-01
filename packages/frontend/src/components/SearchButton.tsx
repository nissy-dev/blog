"use client";

import Link from "next/link";
import {
  type ChangeEvent,
  type MouseEvent,
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaSearch } from "react-icons/fa";

import { useTranslation } from "../i18n/client";

import styles from "./SearchButton.module.css";

export const SearchButton = () => {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);

  const onClickDialogBackDrop = useCallback(
    (e: MouseEvent<HTMLDialogElement>) => {
      if (
        e.target instanceof HTMLDialogElement &&
        e.target.closest("#dialog-container") === null
      ) {
        setSearchQuery("");
        dialogRef.current?.close();
      }
    },
    [],
  );

  const onClickLink = useCallback(() => {
    setSearchQuery("");
    dialogRef.current?.close();
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className={styles.button}
        title={t("search-blog")}
      >
        <FaSearch />
      </button>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: ここでは無視する */}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        onClick={onClickDialogBackDrop}
      >
        <div id="dialog-container" className={styles.dialogContainer}>
          <input
            type="search"
            placeholder={t("search-blog")}
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
          <SearchResults
            searchQuery={deferredQuery}
            onClickLink={onClickLink}
          />
        </div>
      </dialog>
    </>
  );
};

type Post = {
  id: string;
  title: string;
  content: string;
};

type SearchResultProps = {
  searchQuery: string;
  onClickLink: () => void;
};

const FTS_API_ENDPOINT =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8787";

const SearchResults = ({ searchQuery, onClickLink }: SearchResultProps) => {
  if (searchQuery === "") {
    return null;
  }

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchSearchResults() {
      const response = await fetch(
        `${FTS_API_ENDPOINT}/api/fts/search?q=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const result = (await response.json()) as { posts: Post[] };
      setPosts(result.posts);
    }

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className={styles.searchResult}>
      {posts.length === 0 && <div>No results for "{searchQuery}"</div>}
      {posts.length > 0 && (
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <Link href={`/post/${post.id}`} onClick={onClickLink}>
                  {post.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
