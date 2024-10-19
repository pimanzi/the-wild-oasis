import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

function useRecentStays() {
  const [searchParams] = useSearchParams();
  const filterDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'));

  const dateToFilterFrom = subDays(new Date(), filterDays).toISOString();

  const { data: lastStays, isLoading } = useQuery({
    queryKey: ['stays', `last-${filterDays}`],
    queryFn: () => getStaysAfterDate(dateToFilterFrom),
  });
  const confirmedstays = lastStays?.filter(
    (stays) => stays.status === 'checked-in' || stays.status === 'checked-out'
  );
  return { lastStays, isLoading, confirmedstays };
}

export default useRecentStays;
