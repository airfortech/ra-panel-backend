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
  const { enemies, users } = messages[lang].privileges;
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
