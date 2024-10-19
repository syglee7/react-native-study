import axiosInstance from '@/api/axios.ts';
import {ImageUri, Post} from '@/types/domain.ts';

type ResponsePost = Post & {images: ImageUri[]};
type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};

const createPost = async (body: RequestCreatePost): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
};

export {createPost};
export type {ResponsePost, RequestCreatePost};
