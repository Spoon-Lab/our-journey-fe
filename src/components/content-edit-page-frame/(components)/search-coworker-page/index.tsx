import EditHeader from '../edit-header';
import SearchBar from '../search-bar';

import s from './style.module.scss';

interface SearchCoworkerPageProps {
  onClosed: () => void;
}

export default function SearchCoworkerPage({ onClosed }: SearchCoworkerPageProps) {
  return (
    <div className={s.searchCoworkerPage}>
      <EditHeader titleText="작업자 추가하기" onClick={onClosed} />
      <SearchBar />
    </div>
  );
}
