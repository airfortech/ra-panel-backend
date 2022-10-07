import { User } from "./User";

export interface Config {
  app: {
    host: string;
    port: number;
  };
  frontend: {
    host: string;
  };
  db: {
    url: string;
  };
  secret?: {
    passportSecretOrKey?: string;
  };
  users?: User[];
}
