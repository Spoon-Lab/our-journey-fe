/** 여기서부터 필요한 route 추가해주세요! */
export const ROUTES = {
  main: '/main',
  search: '/search',
  category: '/category',
  menu: '/menu',
  newContents: '/new-contents',
  detail: '/detail',
  base: '/',
  login: '/login',
  signup: '/signup',
  resetPassword: '/reset-password',
  email: '/reset-password/email',
  profile: '/profile',
  profileEdit: '/profile/edit',
};

export type ROUTES = (typeof ROUTES)[keyof typeof ROUTES];
