import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooking } from '../../services/apiBookings';

export function useBooking() {
  const { bookingId: id } = useParams();
  const {
    isLoading,
    data: Booking,
    error,
  } = useQuery({
    queryKey: ['Booking'],
    queryFn: () => getBooking(id),
  });

  return { isLoading, error, Booking };
}
