import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Page_Size } from '../../utils/constants';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status');
  const sortValue = searchParams.get('sortBy') || 'startDate-desc';
  const queryClient = useQueryClient();

  // Filter
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // Sorting
  const [sortField, sortFieldDirection] = sortValue.split('-');
  const sortBy = { sortField, sortFieldDirection };

  // Pagination
  const page = Number(searchParams.get('page')) || 1;

  // Fetch data using useQuery
  const {
    isLoading,
    data: { data: bookings = [], count = 0 } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });

  const PageCount = Math.ceil(count / Page_Size);
  if (page < PageCount) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings(filter, sortBy, page + 1),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings(filter, sortBy, page - 1),
    });
  }

  return { isLoading, error, bookings, count };
}
