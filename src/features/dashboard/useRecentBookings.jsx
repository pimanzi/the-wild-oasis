import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const filterDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));

  const dateToFilterFrom = subDays(new Date(), filterDays).toISOString();

  const { data: lastBookings, isLoading } = useQuery({
    queryKey: ['bookings', `last-${filterDays}`],
    queryFn: () => getBookingsAfterDate(dateToFilterFrom),
  });

  const confirmedBookings = lastBookings?.filter(
    (booking) =>
      booking.status === 'checked-in' || booking.status === 'checked-out'
  );
  return { lastBookings, isLoading, confirmedBookings };
}

export default useRecentBookings;
