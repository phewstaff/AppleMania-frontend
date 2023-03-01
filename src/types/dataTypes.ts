export interface IProduct {
  _id?: string;
  name?: string;
  image1?: {
    lg: string;
    sm: string;
  };
  image2?: {
    lg: string;
    sm: string;
  };
  image3?: {
    lg: string;
    sm: string;
  };
  previewImage?: {
    lg: string;
    sm: string;
  };
  price?: string;
  quantity: number;
  description?: string;
}

export interface ICategory {
  _id: string;
  name: string;
  image: string;
  imageMin: string;
  __v: number;
}
export interface IUser {
  username: string;
  password: string;
}
export interface UserResponse {
  token: string;
  username: string;
}
