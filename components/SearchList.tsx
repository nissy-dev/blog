import { css } from "@emotion/react";

import { Link } from "components/Link";
import { SearchByAlgolia } from "components/icons";
import { useTranslation } from "utils/useTranslation";
import { SearchHitType } from "utils/useAlgoliaSearch";

const ErrorMessage = ({ message }: { message: string }) => {
  return <div css={errorMessageStyle}>{`${message}`}</div>;
};

const errorMessageStyle = css`
  padding: 1rem 0.5rem;
  text-align: center;
`;

const NoHitMessage = ({ query }: { query: string }) => {
  const { t } = useTranslation();
  return <div css={noHitMessageStyle}>{`${t("search-no-results")} "${query}"`}</div>;
};

const noHitMessageStyle = css`
  padding: 1rem 0.5rem;
  text-align: center;
`;

type HitComponentProps = {
  hit: SearchHitType;
  onClick: () => void;
};

const HitComponent = ({ hit, onClick }: HitComponentProps) => {
  console.log(hit._highlightResult);
  return (
    <Link css={hitStyle} href={`/post/${encodeURIComponent(hit.postId)}`} onClick={onClick}>
      <div dangerouslySetInnerHTML={{ __html: hit._highlightResult?.title?.value as string }} />
      <div dangerouslySetInnerHTML={{ __html: hit._highlightResult?.excerpt?.value as string }} />
      <div>{hit.date}</div>
    </Link>
  );
};

const hitStyle = css`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid var(--gray-500);

  :hover {
    text-decoration: none;
  }

  > div:nth-of-type(1) {
    padding-bottom: 0.5rem;
    font-size: 1.1rem;
    font-weight: var(--font-bold);
  }

  > div:nth-of-type(2) {
    font-size: 0.9rem;
  }

  > div:nth-of-type(3) {
    margin-left: auto;
    font-size: 0.8rem;
  }

  em {
    padding: 0 0.2rem;
    background-color: var(--gray-500);
    border-radius: 0.25rem;
  }
`;

type HitListProps = {
  hits: SearchHitType[];
  handleSearchBox: () => void;
};

const HitList = ({ hits, handleSearchBox }: HitListProps) => {
  return (
    <ul>
      {hits.map((hit) => {
        return (
          <li key={hit.postId}>
            <HitComponent hit={hit} onClick={handleSearchBox} />
          </li>
        );
      })}
    </ul>
  );
};

type SearchListProps = {
  query: string;
  searchHits: SearchHitType[];
  searchError: Error | undefined;
  handleSearchBox: () => void;
};

export const SearchList = ({
  query,
  searchHits,
  searchError,
  handleSearchBox,
}: SearchListProps) => {
  return (
    <div css={panelStyle}>
      <div>
        {searchError !== undefined && <ErrorMessage message={searchError.message} />}
        {searchError === undefined && searchHits.length === 0 && <NoHitMessage query={query} />}
        {searchError === undefined && searchHits.length !== 0 && (
          <HitList hits={searchHits} handleSearchBox={handleSearchBox} />
        )}
      </div>
      <div>
        <a href="https://www.algolia.com/" target="_blank" rel="noopener noreferrer">
          <SearchByAlgolia />
        </a>
      </div>
    </div>
  );
};

const panelStyle = css`
  display: flex;
  flex-direction: column;
  width: 40rem;
  margin-top: 0.5rem;
  margin-left: auto;
  background-color: var(--gray-300);
  box-shadow: 0 2px 2px var(--gray-500);

  > div:nth-of-type(1) {
    max-height: 25rem;
    overflow: scroll;
  }

  > div:nth-of-type(2) {
    padding-top: 0.5rem;
    padding-right: 0.5rem;
    margin-left: auto;
  }

  @media screen and (max-width: 640px) {
    width: 100%;

    > div:nth-of-type(1) {
      max-height: 20rem;
    }
  }
`;
