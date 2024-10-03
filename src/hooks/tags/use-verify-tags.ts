import { useEffect, useState } from 'react';

import type { Tag } from '@/types/tags';

import useSearchTag from './use-search-tag';

export function useVerifyTags(tagNames: string[]) {
  const [verifiedTags, setVerifiedTags] = useState<Tag[]>([]);
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const [currentTagName, setCurrentTagName] = useState('');

  useEffect(() => {
    if (tagNames.length > 0 && currentTagIndex < tagNames.length) {
      setCurrentTagName(tagNames[currentTagIndex]);
    }
  }, [tagNames, currentTagIndex]);

  const { data: suggestedTags, isSuccess } = useSearchTag(currentTagName);

  useEffect(() => {
    if (isSuccess && suggestedTags) {
      const matchedTag: Tag = Array.isArray(suggestedTags)
        ? suggestedTags.find((tag: Tag) => tag.tagName.toLowerCase() === currentTagName.toLowerCase())
        : undefined;

      if (matchedTag) {
        setVerifiedTags((prev) => [...prev, { tagId: matchedTag.tagId, tagName: matchedTag.tagName }]);
      }
      setCurrentTagIndex((prevIndex) => prevIndex + 1);
    }
  }, [isSuccess, suggestedTags, currentTagName]);

  const isVerificationComplete = currentTagIndex >= tagNames.length;

  return { verifiedTags, isVerificationComplete };
}
