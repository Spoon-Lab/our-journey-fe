import { useEffect, useState } from 'react';

export const useCurrentKeyword = () => {
  const [currentKeyword, setCurrentKeyword] = useState<string>('');
  const [keywordList, setKeywordList] = useState<string[]>([]);

  useEffect(() => {
    if (currentKeyword.trim() !== '') {
      const currentKeywordList: string[] = [];
      keywordList.forEach((lastKeyword) => {
        if (currentKeyword !== lastKeyword) {
          currentKeywordList.push(lastKeyword);
        }
      });

      currentKeywordList.unshift(currentKeyword);

      if (currentKeywordList.length > 6) {
        currentKeywordList.pop();
      }
      localStorage.setItem('currentKeywordList', JSON.stringify(currentKeywordList));
      setKeywordList(currentKeywordList);
      setCurrentKeyword('');
    }
  }, [currentKeyword, keywordList]);

  useEffect(() => {
    const storedKeywordList = localStorage.getItem('currentKeywordList');
    if (storedKeywordList) {
      setKeywordList(JSON.parse(storedKeywordList) as string[]);
    } else {
      setKeywordList([]);
    }
  }, []);
  return {
    keywordList,
    setCurrentKeyword,
    setKeywordList,
  };
};
