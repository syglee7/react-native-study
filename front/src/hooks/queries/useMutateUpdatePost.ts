import {useMutation} from '@tanstack/react-query';
import {UseMutationCustomOptions} from '@/types';
import {updatePost} from '@/api';
import queryClient from '@/api/queryClient.ts';
import {queryKeys} from '@/constants';

function useMutateUpdatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      queryClient.setQueryData(
        [queryKeys.POST, queryKeys.GET_POST, newPost.id],
        newPost,
      );
    },
    ...mutationOptions,
  });
}

export default useMutateUpdatePost;
