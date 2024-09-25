import { create } from 'domain';
import { th } from 'framer-motion/client';

/** 여기서부터 필요한 route 추가해주세요! */
export const ROUTES = {
  main: '/main',
  search: '/search',
  category: '/category',
  menu: '/menu',
  base: '/',
  login: '/login',
  signup: '/signup',
  resetPassword: '/reset-password',
  email: '/reset-password/email',
  profile: '/profile',
  profileEdit: '/profile/edit',

  content: {
    detail: (contentId: number) => `/content/${contentId}`,
    edit: (contentId: number) => `/content/${contentId}/edit`,
    create: () => `/content/create`,
  },
  thread: {
    create: (contentId: number) => `/content/${contentId}/thread/create`,
    edit: (contentId: number, threadId: number) => `/content/${contentId}/thread/${threadId}/edit`,
  },
};

export type ROUTES = (typeof ROUTES)[keyof typeof ROUTES];
