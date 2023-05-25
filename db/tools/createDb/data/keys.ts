import { Key } from "../../../../types/Key";
import { keysData } from "./generatorData/keys";

export const keys: Key[] = keysData.map(({ name, domain }) => {
  return {
    name,
    treasury: null,
    domain,
    description: "",
    comment: "",
    isActive: true,
  };
});
