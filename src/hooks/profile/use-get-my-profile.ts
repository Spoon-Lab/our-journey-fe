import { useQuery } from '@tanstack/react-query';

import type { Profile } from '@/types/profile';

import { getMyProfile } from '@/libs/auth-service';

const useGetMyProfile = () =>
  useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: getMyProfile,
  });

export default useGetMyProfile;
