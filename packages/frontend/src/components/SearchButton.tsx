"use client";

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

  const handleSearchButton = () => dialogRef.current?.showModal();
  const handleSearchBox = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);
  const onClickDialogBackDrop = useCallback(
    (e: MouseEvent<HTMLDialogElement>) => {
      if (
        e.target instanceof HTMLDialogElement &&
        e.target.closest("#dialog-container") === null
      ) {
        dialogRef.current?.close();
      }
    },
    [],
  );

  return (
    <>
      <button
        type="button"
        onClick={handleSearchButton}
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
        <div id="dialog-container">
          <input
            type="search"
            id="search"
            placeholder={t("search-blog")}
            value={searchQuery}
            onChange={handleSearchBox}
          />
        </div>
      </dialog>
    </>
  );
};
