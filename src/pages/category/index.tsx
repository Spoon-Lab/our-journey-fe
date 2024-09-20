import type { ReactNode } from 'react';

import Header from '@/components/header';
import DefaultLayout from '@/components/layouts';
import NavBar from '@/components/nav-bar';
import SearchBar from '@/components/search-bar';

import CategoryArea from './component/category-area';
import CurrentSearchArea from './component/current-search-area';

import s from './style.module.scss';

export default function Search() {
  return (
    <>
      <Header title="검색" />
      <section className={s.categoryWrapper}>
        <SearchBar type="input" />
        <CategoryArea />
        <CurrentSearchArea />
        <NavBar />
      </section>
    </>
  );
}

Search.getLayout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
