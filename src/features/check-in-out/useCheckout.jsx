import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: isCheckingout } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, {
        status: 'checked-out',
      }),
    onSuccess: (data) => {
      toast.success(`Booking ${data.id} was successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error('An error occured in checking out the booking ');
    },
  });
  return { checkout, isCheckingout };
}

export default useCheckout;
