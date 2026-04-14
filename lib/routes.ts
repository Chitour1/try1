export const ROUTES = {
  home: '/',
  auth: '/auth',
  forum: '/forum',
  social: '/social',
  news: '/news',
  search: '/search',
  notifications: '/notifications',
  create: '/create',
  menu: '/menu',
  account: '/u/me',
  contact: '/a21',
  support: '/a22',
  terms: '/a23',
  privacy: '/a24',
  community: '/a25',
  build: '/build'
} as const;

export const MEMBER_ROUTES = new Set<string>(['/notifications', '/create']);

export const ALLOWED_INTERNAL_HREFS = new Set<string>([
  '/',
  '/auth',
  '/forum',
  '/social',
  '/news',
  '/search',
  '/notifications',
  '/create',
  '/menu',
  '/u/me',
  '/a21',
  '/a22',
  '/a23',
  '/a24',
  '/a25',
  '/build'
]);
