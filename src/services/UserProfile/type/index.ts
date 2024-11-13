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
type ErrorResponseData = {
  error: string;
}
interface UpdateUserProfileResponse extends Response {
  code: number;
  data: UpdateSuccessResponseData | ErrorResponseData;
  message: string;
}
type GetProfileDataType = {
  userId: string;
  nickname: string;
  gender: 'male' | 'female' | 'other';
  birthDate: Date;
  occupation: string;
  region: string;
}
interface getProfileResponse extends Response {
  code: number;
  data: GetProfileDataType | ErrorResponseData;
  message: string;
}
export {
  UserProfileDetail,
  UpdateUserProfileDetailRequest,
  UpdateUserProfileResponse,
  getProfileResponse,
}