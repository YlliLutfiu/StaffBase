export enum UserRole {
  USER = 'user',
  EMPLOYEE = 'employee',
}

export interface UserDTO {
  user_id?: number;
  username: string;
  email: string;
  password: string;
  role?: UserRole;
}