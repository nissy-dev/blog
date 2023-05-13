"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

import "@docsearch/css";

import { siteMetadata, ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY, ALGOLIA_INDEX_NAME } from "../const";
import { useTranslation } from "../i18n/client";

import styles from "./Header.module.scss";
import { ProfileButton } from "./ProfileButton";
import { ThemeSwitchButton } from "./ThemeSwitchButton";

import type { DocSearchProps } from "@docsearch/react";

// @docsearch/react is 20kb over, so use dynamic import
const DocSearch = dynamic<DocSearchProps>(() =>
  import("@docsearch/react").then((module) => module.DocSearch)
);

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <Link className={styles["title-container"]} href="/" title={t("nav-title")}>
        <h1>{siteMetadata.title}</h1>
      </Link>
      <ProfileButton />
      <ThemeSwitchButton />
      <Suspense fallback={null}>
        <DocSearch
          appId={ALGOLIA_APP_ID}
          indexName={ALGOLIA_INDEX_NAME}
          apiKey={ALGOLIA_SEARCH_KEY}
        />
      </Suspense>
    </header>
  );
};
