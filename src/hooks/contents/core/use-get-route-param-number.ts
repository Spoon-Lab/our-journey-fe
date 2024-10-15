import { useParams } from 'next/navigation';

type ParamKey = string;

export function useGetRouteParamNumber<T extends ParamKey = 'id'>(paramKey: T = 'id' as T): number {
  const params = useParams()?.[paramKey];
  return params !== undefined ? Number(params) : -1;
}
