import axiosInstance from '@/api/axios.ts';
import {ImageUri, Post} from '@/types/domain.ts';

type ResponsePost = Post & {images: ImageUri[]};
type RequestCreatePost = Omit<Post, 'id'> & {imageUris: ImageUri[]};

const getPosts = async (page = 1): Promise<ResponsePost[]> => {
  const {data} = await axiosInstance.get(`/posts/my?page=${page}`);
  return data;
};

const createPost = async (body: RequestCreatePost): Promise<ResponsePost> => {
  const {data} = await axiosInstance.post('/posts', body);

  return data;
};

type ResponseSinglePost = ResponsePost & {isFavorite: boolean};

const getPost = async (id: number): Promise<ResponseSinglePost> => {
  const {data} = await axiosInstance.get(`/posts/${id}`);

  return data;
};

const deletePost = async (id: number) => {
  const {data} = await axiosInstance.delete(`/posts/${id}`);

  return data;
};

export {createPost, getPost, getPosts, deletePost};
export type {ResponsePost, RequestCreatePost, ResponseSinglePost};
