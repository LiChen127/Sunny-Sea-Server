import Response from "../../../types/responseType.js";
interface UserProfileDetail {
  id: string;
  nickname: string;
  gender: 'male' | 'female' | 'other';
  birthDate: Date;
  occupation: string;
  region: string;
}
interface UpdateUserProfileDetailRequest {
  userId: string;
  nickname: string;
  gender: 'male' | 'female' | 'other';
  birthDate: Date;
  occupation: string;
  region: string;
}
type UpdateSuccessResponseData = {
  id: string;
  userId: string;
}
type UpdateErrorResponseData = {
  error: string;
}
interface UpdateUserProfileResponse extends Response {
  code: number;
  data: UpdateSuccessResponseData | UpdateErrorResponseData;
  message: string;
}
export {
  UserProfileDetail,
  UpdateUserProfileDetailRequest,
  UpdateUserProfileResponse,
}