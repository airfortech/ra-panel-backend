import { keyGiverDrops } from "../db/tools/createDb/data/keyGiverDrops";
import { Language } from "./Language";
import { UserRole } from "./UserRole";
import { messages } from "./responseMessages";

export interface UserPrivileges {
  category: string;
  actions: {
    action: string;
    isAllowed: boolean;
  }[];
}

export const userPrivileges = (
  lang: Language,
  userRole: UserRole
): UserPrivileges[] => {
  const isAllowed = (...allowedRoles: UserRole[]) => {
    return allowedRoles.includes(userRole);
  };
  const { enemies, keyGiverDrops, keyGivers, keys, locations, users } =
    messages[lang].privileges;
  return [
    {
      category: enemies.category,
      actions: [
        {
          action: enemies.getEnemies,
          isAllowed: isAllowed(
            UserRole.consigliore,
            UserRole.caporegime,
            UserRole.soldato,
            UserRole.mudlet
          ),
        },
        {
          action: enemies.addEnemies,
          isAllowed: isAllowed(UserRole.consigliore, UserRole.caporegime),
        },
        {
          action: enemies.editEnemies,
          isAllowed: isAllowed(
            UserRole.consigliore,
            UserRole.caporegime,
            UserRole.soldato
          ),
        },
        {
          action: enemies.deleteEnemies,
          isAllowed: isAllowed(UserRole.consigliore, UserRole.caporegime),
        },
      ],
    },
    {
      category: keyGiverDrops.category,
      actions: [
        {
          action: keyGiverDrops.getKeyGiverDrops,
          isAllowed: isAllowed(
            UserRole.consigliore,
            UserRole.caporegime,
            UserRole.soldato,
            UserRole.mudlet
          ),
        },
        {
          action: keyGiverDrops.addKeyGiverDrops,
          isAllowed: isAllowed(
            UserRole.consigliore,
            UserRole.caporegime,
            UserRole.soldato
          ),
        },
        {
          action: keyGiverDrops.editKeyGiverDrops,
          isAllowed: isAllowed(
            UserRole.consigliore,
            UserRole.caporegime,
            UserRole.soldato
          ),
        },
        {
          action: keyGiverDrops.deleteKeyGiverDrops,
          isAllowed: isAllowed(
            UserRole.consigliore,
            UserRole.caporegime,
            UserRole.soldato
          ),
        },
      ],
    },
    {
      category: keyGivers.category,
      actions: [
        {
          action: keyGivers.getKeyGivers,
          isAllowed: isAllowed(
            UserRole.consigliore,
            UserRole.caporegime,
            UserRole.soldato,
            UserRole.mudlet
          ),
        },
        {
          action: keyGivers.addKeyGivers,
          isAllowed: isAllowed(UserRole.consigliore, UserRole.caporegime),
        },
        {
          action: keyGivers.editKeyGivers,
          isAllowed: isAllowed(UserRole.consigliore, UserRole.caporegime),
        },
        {
          action: keyGivers.deleteKeyGivers,
          isAllowed: isAllowed(UserRole.consigliore),
        },
      ],
    },
    {
      category: keys.category,
      actions: [
        {
          action: keys.getKeys,
          isAllowed: isAllowed(
            UserRole.consigliore,
            UserRole.caporegime,
            UserRole.soldato,
            UserRole.mudlet
          ),
        },
        {
          action: keys.addKeys,
          isAllowed: isAllowed(UserRole.consigliore, UserRole.caporegime),
        },
        {
          action: keys.editKeys,
          isAllowed: isAllowed(UserRole.consigliore, UserRole.caporegime),
        },
        {
          action: keys.deleteKeys,
          isAllowed: isAllowed(UserRole.consigliore),
        },
      ],
    },
    {
      category: locations.category,
      actions: [
        {
          action: locations.getLocations,
          isAllowed: isAllowed(
            UserRole.consigliore,
            UserRole.caporegime,
            UserRole.soldato,
            UserRole.mudlet
          ),
        },
        {
          action: locations.addLocations,
          isAllowed: isAllowed(UserRole.consigliore, UserRole.caporegime),
        },
        {
          action: locations.editLocations,
          isAllowed: isAllowed(UserRole.consigliore, UserRole.caporegime),
        },
        {
          action: locations.deleteLocations,
          isAllowed: isAllowed(UserRole.consigliore),
        },
      ],
    },
    {
      category: users.category,
      actions: [
        {
          action: users.changePassword,
          isAllowed: isAllowed(UserRole.consigliore),
        },
      ],
    },
  ];
};
