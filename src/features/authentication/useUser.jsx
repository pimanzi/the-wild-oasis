import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../services/apiAuth';

function useUser() {
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const isAuthenticated = data?.role === 'authenticated';
  return { isAuthenticated, isLoading };
}

export default useUser;
