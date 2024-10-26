const dictionaries = {
  "email-link": "メールを送る",
  "github-link": "GitHubアカウントを開く",
  "twitter-link": "Twitterアカウントを開く",
  "switch-dark-mode": "ダークモードをオンにする",
  "switch-light-mode": "ライトモードをオンにする",
  "nav-title": "ブログトップページ",
  "nav-profile": "プロフィール詳細",
  "toggle-theme": "Toggle Dark/Light Mode",
  "toggle-menu": "Toggle Menu",
  "read-more": "詳細を読む",
  "post-list-header": "投稿一覧",
  "table-of-contents": "目次",
  "top-page-description":
    "Nissyのブログです。Web周りのことについて書くことが多いです。",
  "toggle-toc": "Toggle Table of Contents",
  "open-toc": "目次を開く",
  "close-toc": "目次を閉じる",
  "go-to-previous-page": "前のページへ",
  "go-to-next-page": "次のページへ",
  "search-blog": "ブログを検索する",
};

export type Locale = "ja";

export type i18nKey = keyof typeof dictionaries;

export const useTranslation = () => {
  return {
    t: (key: i18nKey) => dictionaries[key],
  };
};

export const getTranslation = async () => {
  return {
    t: (key: i18nKey) => dictionaries[key],
  };
};
