import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import { updateUser } from '../../services/apiAuth';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updatingUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success('User sccount successfully updated');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdatingUser, updatingUser };
}
