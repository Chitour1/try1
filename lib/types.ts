export type UpdateItem = {
  id: string;
  type: string;
  actor: string;
  time: string;
  target_title: string;
  target_url: string;
  pinned?: boolean;
  featured?: boolean;
  hidden?: boolean;
};

export type HomeSummary = {
  latestThread: { title: string; href: string; meta: string };
  latestPost: { title: string; href: string; meta: string };
  latestArticle: { title: string; href: string; meta: string };
  updates: UpdateItem[];
  unreadDots: { forum: boolean; social: boolean; news: boolean };
};
