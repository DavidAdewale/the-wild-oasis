import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings as getBookingsApi } from '../../services/apiBookings';
// import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //FILTER
  const filteredValue = searchParams.get('status');
  const filter =
    !filteredValue || filteredValue === 'all'
      ? null
      : { field: 'status', value: filteredValue, method: 'eq' };

  //SORT
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  //PAGINATION
  const page = !searchParams.get('page') ? 1 : +searchParams.get('page');

  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookingsApi({ filter, sortBy, page }),
  });

  //PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookingsApi({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookingsApi({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, count };
}

/*
export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status');

  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  const sortBy = searchParams.get('sortBy');

  let currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  currentPage = filter?.value !== filterValue ? 1 : currentPage;

  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings', filter, sortBy, currentPage],
    // eslint-disable-next-line
    //@ts-ignore
    queryFn: () => getBookings({ filter, sortBy, currentPage }),
  });

  const pageCount = Math.ceil(currentPage / PAGE_SIZE);

  if (currentPage < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, currentPage + 1],
      queryFn: () =>
        // eslint-disable-next-line
        //@ts-ignore
        getBookings({ filter, sortBy, currentPage: currentPage + 1 }),
    });

  if (currentPage > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, currentPage - 1],
      queryFn: () =>
        // eslint-disable-next-line
        //@ts-ignore
        getBookings({ filter, sortBy, currentPage: currentPage - 1 }),
    });

  return { isLoading, bookings };
};
*/
