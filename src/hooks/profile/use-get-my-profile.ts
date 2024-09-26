import { useQuery } from '@tanstack/react-query';

import type { Profile } from '@/types/profile';
import { API_PATHS } from '@/constants/api';

import axiosInstance from '@/libs/axios';

const getProfile = async () => {
  const { data }: { data: Profile } = await axiosInstance.get(`${API_PATHS.PROFILES.CREATE()}`);

  return data;
};

const useGetMyProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

export default useGetMyProfile;
