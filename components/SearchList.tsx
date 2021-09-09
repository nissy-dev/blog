import { css } from "@emotion/react";
import { Hits, Panel, PoweredBy, Highlight } from "react-instantsearch-dom";
import { connectStateResults, Hit, StateResultsProvided } from "react-instantsearch-core";
import { useTranslation } from "react-i18next";

import { Link } from "./Link";
import { FrontMatter } from "../lib/api";

type ErrorComponentProps = {
  searchQuery: string;
};

const ErrorComponent = ({ searchQuery }: ErrorComponentProps) => {
  const { t } = useTranslation();
  return <div css={errorStyle}>{`${t("search-no-results")} "${searchQuery}"`}</div>;
};

const errorStyle = css`
  padding: 1rem 0;
  text-align: center;
`;

type HitDoc = FrontMatter & {
  postId: string;
  content: string;
};

type HitComponentProps = {
  hit: Hit<HitDoc>;
};

const HitComponent = ({ hit }: HitComponentProps) => {
  return (
    <div css={hitStyle}>
      <Link href={`/post/${encodeURIComponent(hit.postId)}`}>
        <Highlight hit={hit} attribute="title" />
        <Highlight hit={hit} attribute="excerpt" />
        <div>{hit.date}</div>
      </Link>
    </div>
  );
};

const hitStyle = css`
  > a {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid var(--gray-500);
    text-decoration: none;
    cursor: pointer;

    > span:nth-of-type(1) {
      font-size: 1.1rem;
      font-weight: var(--font-bold);
      padding-bottom: 0.5rem;
    }

    > span:nth-of-type(2) {
      font-size: 0.9rem;
    }

    > div {
      margin-left: auto;
      font-size: 0.8rem;
    }

    em {
      padding: 0 0.2rem;
      border-radius: 0.25rem;
      background-color: var(--gray-500);
    }
  }
`;

const SearchList = (props: StateResultsProvided) => {
  const { searchState, searchResults } = props;
  if (searchState && !searchState.query) {
    return null;
  }

  return (
    <Panel css={panelStyle} footer={<PoweredBy css={poweredByStyle} />}>
      {searchResults && searchResults.nbHits > 0 ? (
        <Hits hitComponent={HitComponent} />
      ) : (
        /* @ts-ignore */
        <ErrorComponent searchQuery={searchState.query} />
      )}
    </Panel>
  );
};

const panelStyle = css`
  position: absolute;
  top: 2.5rem;
  right: 0.5rem;
  z-index: 1;
  width: 40rem;
  background-color: var(--gray-300);
  box-shadow: 0 2px 2px var(--gray-500);

  /* stylelint-disable-next-line no-descending-specificity */
  > div {
    max-height: 25rem;
    overflow: scroll;
  }

  @media screen and (max-width: 640px) {
    /* TODO: 100% でなぜうまくいかないのかちゃんと調べる */
    width: 98%;

    > div {
      max-height: 20rem;
    }
  }
`;

const poweredByStyle = css`
  display: flex;
  flex-direction: row;
  padding-right: 0.5rem;
  padding-top: 0.5rem;

  /* stylelint-disable-next-line no-descending-specificity */
  > span {
    padding-top: 0.25rem;
    padding-right: 0.5rem;
    margin-left: auto;
  }
`;

export const ConnectedSearchList = connectStateResults(SearchList);
