export interface UserRepositoriesData {
  id: number;
  name: string;
  description: string | null;
  owner: {
    login: string;
  };
}
