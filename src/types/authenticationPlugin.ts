export type AuthenticationPlugin = {
  id: string;
  label: string;
  providesAuth: string[];
  schema: object | null;
};
