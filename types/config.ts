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
  jwt?: {
    passportSecretOrKey: string;
    salt: string;
  };
  users?: User[];
}
