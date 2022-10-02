export interface IUser {
  id: number;
  name: string;
  username: string;
  role: "ADMIN" | "CONSUMER";
  isActive: boolean;
  createdAt: string;
  UpdatedAt: string;
}
