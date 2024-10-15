import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, {
        status: 'checked-in',
        isPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} was successfully checked in`);
      navigate('/dashboard');
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error('An error occured in checking in the booking ');
    },
  });
  return { checkin, isCheckingIn };
}

export default useCheckin;
