export const messagesEn = {
  default: "Something went wrong.",
  auth: {
    wrongRole: "Role doesn't exist.",
    wrongPassword: "Wrong password.",
    unauthorized: "You have no permission.",
    logout: "You have logged out.",
    login: "You have logged in.",
  },
  users: {
    noRolesInDb: "No roles found in database. Contact with admin.",
    passwordChanged: "Password has been changed.",
    passwordMinLengthError: "Password must be at least 5 characters long.",
    passwordRequiredError: "Password is required.",
  },
  enemies: {
    enemyExists: (name: string) => `Enemy ${name} exists.`,
    enemyNotExists: "Such enemy not exists.",
    enemyAdded: (name: string) => `Enemy ${name} has been added.`,
    nameIsRequired: "Enemy name is required.",
    enemyDeleted: (name: string) => `Enemy ${name} has been deleted.`,
    enemyUpdated: (name: string) =>
      `Enemy ${name ? name + " " : name}has been updated.`,
    wrongNameProvided: "Wrong name provided.",
    nameTooLong: "Name should have maximum 30 characters.",
    shortTooLong: "Short should have maximum 50 characters.",
    commentTooLong: "Comment should have maximum 4000 characters.",
    wrongRace: "Wrong race provided.",
    wrongProfession: "Wrong profession provided.",
    wrongGuild: "Wrong guild provided.",
    wrongLevel: "Wrong level provided.",
    wrongWeapon: "Wrong weapon provided.",
  },
  location: {
    locationAdded: (locationId: number) =>
      `Location ${locationId} has been added.`,
    locationNotExists: "Such location not exists.",
    locationDeleted: (locationId: number) =>
      `Location ${locationId} has been deleted.`,
    locationUpdated: (locationId: number) =>
      `Location ${locationId} has been updated.`,
    locationIdIsRequired: "Location id is required.",
    locationNotANumber: "Location id must be an integer number.",
    locationNumberNotInRange: "Location id number must be in range 0-99999",
    nameTooLong: "Location name should have maximum 30 characters.",
    wrongDomain: "Wrong domain provided.",
    descriptionTooLong: "Description should have maximum 4000 characters.",
    commentTooLong: "Comment should have maximum 4000 characters.",
    bindsTooLong: "Each bind should have maximum 100 characters.",
  },
  keyGivers: {
    keyGiverExists: "Such keygiver exists.",
    keyGiverNotExists: "Such keygiver not exists.",
    nameIsRequired: "Name is required.",
    nameExists: "Such keygiver name exists. Choose other one.",
    nameTooLong: "Name should have maximum 30 characters.",
    shortTooLong: "Name should have maximum 50 characters.",
    descriptionTooLong: "Description should have maximum 4000 characters.",
    respawnTimeNotANumber: "Respawn time must be an integer number of hours.",
    wrongDomain: "Wrong domain provided.",
    playersToCompleteNotInRange:
      "Players to complete number must be in range 0-20",
    commentTooLong: "Comment should have maximum 4000 characters.",
    keyGiverAdded: "Keygiver has been added.",
    keyGiverDeleted: "Keygiver has been deleted.",
  },
  keys: {
    nameExists: "Such key name exists. Choose other one.",
    keyNotExists: "Such key not exists.",
    nameTooLong: "Name should have maximum 80 characters.",
    nameIsRequired: "Name is required.",
    treasuryNameTooLong: "Treasury name should have maximum 80 characters.",
    keyAdded: "Key has been added.",
    keyDeleted: "Key has been deleted.",
  },
  date: {
    invalidDate: "Invalid date format.",
    dateNotNever: "Date must newer than previous one.",
  },
  privileges: {
    enemies: {
      category: "Enemies",
      getEnemies: "get enemies list",
      addEnemies: "add new enemies",
      editEnemies: "edit enemies",
      deleteEnemies: "delete enemies",
    },
    users: {
      category: "Users",
      changePassword: "change password",
    },
  },
};
