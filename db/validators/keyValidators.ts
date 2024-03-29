import { Domain } from "../../types/Domain";

export const domainValidate = (domain: string): Domain => {
  try {
    const validatedDomain = domain.trim();
    if (
      validatedDomain === Domain.Ishtar ||
      validatedDomain === Domain.Imperium
    )
      return validatedDomain;
    return null;
  } catch (e) {
    throw e;
  }
};
