interface publishCommentDetail {
  userId: string;
  postId: string;
  content: string;
}

type CommentData = {
  id: string;
  postId: string;
  userId: string;
  content: string;
}

interface GetCommentsResponse {
  comments: CommentData[];
  total: number;
}

export {
  publishCommentDetail,
  GetCommentsResponse,
  CommentData
}