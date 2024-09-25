import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { Profile } from '@/types/profile';
import { API_BASE_URL, API_PATHS } from '@/constants/api';

const getProfile = async (id: number) => {
  const { data }: { data: Profile } = await axios(`${API_BASE_URL}${API_PATHS.PROFILES.GET(id)}`);

  return data;
};

const useGetProfile = (id: number) =>
  useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile(id),
  });

export default useGetProfile;
