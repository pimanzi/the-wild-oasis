import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginUser } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function useLoginUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user', user.user]);
      queryClient.invalidateQueries(['user']);
      navigate('/dashboard', { replace: true });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLogin };
}
