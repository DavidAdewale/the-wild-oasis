import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isDeleting: isDeletingBooking, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      toast.success('Booking sucessfully deleted');
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeletingBooking, deleteBooking };
}
