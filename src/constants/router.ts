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
  google: '/login/google',
  create: '/create', // main navbar에 경로 없어서 오류나서 추가해두었습니다 나중에 수정해주세요
};

export type ROUTES = (typeof ROUTES)[keyof typeof ROUTES];
