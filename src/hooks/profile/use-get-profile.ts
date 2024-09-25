import { useQuery } from '@tanstack/react-query';

import type { Profile } from '@/types/profile';
import { API_PATHS } from '@/constants/api';

import axiosInstance from '@/libs/axios';

const getProfile = async (id: number) => {
  const { data }: { data: Profile } = await axiosInstance.get(`${API_PATHS.PROFILES.GET(id)}`);

  return data;
};

const useGetProfile = (id: number) =>
  useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfile(id),
  });

export default useGetProfile;
