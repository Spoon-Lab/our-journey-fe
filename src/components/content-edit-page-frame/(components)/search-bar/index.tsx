import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { setSentryLogging } from '@/utils/error-logging';

import s from './style.module.scss';

export default function SearchBar() {
  const { register, watch } = useForm();
  const [query, setQuery] = useState('');

  const { data: userList, isLoading, isError, error } = useQuery({ queryKey: ['users', query], queryFn: () => {} });

  //   const searchValue = watch('searchInput');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  useEffect(() => {
    if (isError) {
      setSentryLogging(error);
    }
  }, [isError, error]);

  return (
    <div className={s.searchBar}>
      <input type="text" placeholder="검색어를 입력하세요" {...register('searchInput')} onChange={handleInputChange} />
      <button type="button">검색</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading users.</p>}

      {/* <ul>{userList?.map((user: { id: number; name: string }) => <li key={user.id}>{user.name}</li>)}</ul> */}
    </div>
  );
}
