interface UserProfileDetail {
  id: string;
  nickname: string;
  gender: 'male' | 'female' | 'other';
  birthDate: Date;
  occupation: string;
  region: string;
}

export {
  UserProfileDetail
}