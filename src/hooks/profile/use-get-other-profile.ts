import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { Profile } from '@/types/profile';

import { getOtherProfile } from '@/libs/auth-service';

export default function useGetOtherProfile(id: number) {
  const { data, isPending, isSuccess, error } = useQuery<Profile, AxiosError>({
    queryKey: ['profile', id],
    queryFn: () => getOtherProfile(id),
    enabled: !!id,
    staleTime: 60 * 1000 * 30,
  });
  return { data, isPending, isSuccess, error };
}
