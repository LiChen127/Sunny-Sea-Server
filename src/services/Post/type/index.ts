interface PublishPostRequest {
  userId: string;
  content: Text;
  tag: string;
  title: string;
}

interface PublishPostSuccessResponse {
  id: string;
  userId: string;
}

interface GetPostsRequest {
  userId?: string;
  page?: number;
  pageSize?: number;
  tag?: string;
  title?: string;
}

interface GetPostsResponse {
  posts: PostArrType[];
  total: number;
}

interface UpdateRequest extends PublishPostRequest {
  id: string;
}

type PostArrType = {
  id: string;
  content: string;
  title: string;
  tag: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
export {
  PublishPostRequest,
  PublishPostSuccessResponse,
  GetPostsRequest,
  GetPostsResponse,
  PostArrType,
  UpdateRequest
}