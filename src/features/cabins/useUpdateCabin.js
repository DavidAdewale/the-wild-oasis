import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEditCabin as updateCabinApi } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => updateCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin successfully edited');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      //   reset();
      //   setShowFormEdit(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateCabin };
}
