import { useRouter } from "next/router";

import { FrontMatter } from "lib/api";

const PER_PAGES = 10;

export const usePagination = (frontMatters: Array<{ id: string } & FrontMatter>) => {
  const router = useRouter();
  const pathname = router.asPath.split(/\?/)[0];
  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
  const queryParams = searchParams.get("page");
  const currentPage = queryParams === null ? 1 : parseInt(queryParams, 10);
  const totalPages = Math.ceil(frontMatters.length / PER_PAGES);
  const start = (currentPage - 1) * PER_PAGES;
  const currentFrontMatters = frontMatters.slice(start, start + PER_PAGES);
  return { pathname, currentPage, totalPages, currentFrontMatters };
};
