import internal from "stream";
import { config } from "../../config/config";

export const messagesEn = {
  default: "Something went wrong.",
  auth: {
    wrongRole: "Role doesn't exist.",
    wrongPassword: "Wrong password.",
    unauthorized: "You have no permission.",
    logout: "You have logged out.",
    login: "You have logged in.",
  },
  settings: {
    backupKeepMonthsTooLowNumber:
      "Minimum months number of backup to keep is 2.",
    backupKeepMonthsNotANumber: "Value of months must be an integer number.",
    settingsChanged: "Settings has been changed.",
    settingsNotExists: "Settings doesn't exist. Create one.",
  },
  backups: {
    saved: (fileName: string) => `Backup has been saved to file: ${fileName}`,
    noBackupsToDelete: "No backup files to delete.",
    backupsDeleted: (count: number) => `Backup files deleted: ${count}`,
    fileNotExists: (fileName: string) =>
      `Backup file: ${fileName} doesn't exist.`,
    backupRestored: (fileName: string) => `Backup file: ${fileName} restored.`,
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
    nameTooLong: "Location name should have maximum 50 characters.",
    wrongDomain: "Wrong domain provided.",
    descriptionTooLong: "Description should have maximum 4000 characters.",
    commentTooLong: "Comment should have maximum 4000 characters.",
    bindsTooLong: "Each bind should have maximum 100 characters.",
    internalIdTooLong: "Internal ID should have maximum 10 characters.",
  },
  keyGivers: {
    keyGiverExists: (name: string) => `Keygiver ${name} exists.`,
    keyGiverNotExists: "Such keygiver not exists.",
    nameIsRequired: "Name is required.",
    nameExists: "Such keygiver name exists. Choose other one.",
    nameTooLong: "Name should have maximum 30 characters.",
    shortTooLong: "Name should have maximum 50 characters.",
    descriptionTooLong: "Description should have maximum 4000 characters.",
    respawnTimeNotANumber: "Respawn time must be an integer number of hours.",
    wrongDomain: "Wrong domain provided.",
    wrongLocationIdProvided: "One or more location id are not valid.",
    locationNotExist: "One or more locations do not exist.",
    playersToCompleteNotInRange:
      "Players to complete number must be in range 0-20",
    commentTooLong: "Comment should have maximum 4000 characters.",
    keyGiverAdded: "Keygiver has been added.",
    keyGiverUpdated: "Keygiver has been updated.",
    keyGiverDeleted: (name: string) => `Keygiver ${name} has been deleted.`,
  },
  keys: {
    keyExists: (name: string) => `Key: ${name} exists. Choose other one.`,
    keyNotExists: "Such key not exists.",
    nameTooLong: "Name should have maximum 80 characters.",
    nameIsRequired: "Name is required.",
    wrongTreasuryIdProvided: "Treasury id is not valid.",
    wrongDomain: "Wrong domain provided.",
    commentTooLong: "Comment should have maximum 4000 characters.",
    descriptionTooLong: "Description should have maximum 4000 characters.",
    keyAdded: (name: string) => `Key: ${name} has been added.`,
    keyUpdated: (name: string) => `Key: ${name} has been updated.`,
    keyDeleted: (name: string) => `Key: ${name} has been deleted.`,
  },
  keyGiverDrops: {
    keyGiverDropIdIsRequired: "KeyGiver drop id is required.",
    keyGiverDropNotExists: "Provided keyGiver drop not exists.",
    keyGiverDropTooOldToDelete: "KeyGiver drop is too old to delete it.",
    dropTooOldToAdd: (time: number) =>
      `You can add only ${time} hours long drop.`,
    dropTooOldToEdit: (time: number) =>
      `You can edit only ${time} hours long drop.`,
    keyNotExists: "Provided key not exists.",
    keyGiverNotExists: "Provided keygiver not exists.",
    keyGiverDropAdded: "KeyGiver drop has been added.",
    keyGiverDropUpdated: "KeyGiver drop has been updated.",
    keyGiverDropDeleted: "KeyGiver drop has been deleted.",
    magicDropNotExists: "One or more magic items do not exist.",
    wrongMagicDropIdProvided: "One or more magic item id are not valid.",
  },
  items: {
    nameTooLong: "Name should have maximum 50 characters.",
    itemShortExists: (short: string) =>
      `Item short: ${short} exists. Choose other one.`,
    shortTooLong: "Short should have maximum 50 characters.",
    shortIsRequired: "Short type is required.",
    invalidType: "Wrong item type.",
    typeIsRequired: "Item type is required.",
    invalidWeaponType: "Wrong weapon type.",
    invalidWeaponHand: "Wrong weapon hand.",
    invalidArmorClass: "Wrong armor class.",
    invalidDurability: "Wrong item durability.",
    specialBonusTooLong: "Special bonus should have maximum 400 characters.",
    occurrenceTooLong: "Occurrence should have maximum 200 characters.",
    descriptionTooLong: "Description should have maximum 4000 characters.",
    commentTooLong: "Comment should have maximum 4000 characters.",
    weaponEffectivenessTooLow: "Weapon effectiveness must be at least 1.",
    weaponEffectivenessTooHigh: "Weapon effectiveness must be max 14.",
    weaponEffectivenessNotInteger:
      "Weapon effectiveness must be an integer number.",
    weaponBalanceTooLow: "Weapon balance must be at least 1.",
    weaponBalanceTooHigh: "Weapon balance must be max 14.",
    weaponBalanceNotInteger: "Weapon balance must be an integer number.",
    armorResTooLow: "Armor resistance must be at least 1.",
    armorResTooHigh: "Armor resistance must be max 12.",
    armorResNotInteger: "Armor resistance must be an integer number.",
    shieldParryTooLow: "Shield parry must be at least 1.",
    shieldParryTooHigh: "Shield parry must be max 14.",
    shieldParryNotInteger: "Shield parry must be an integer number.",
    itemWeightTooLow: "Item weight must be at least 1.",
    itemWeightTooHigh: "Item weight must be max 1 000 000.",
    itemWeightNotInteger: "Item weight must be an integer number.",
    itemVolumeTooLow: "Item volume must be at least 1.",
    itemVolumeTooHigh: "Item volume must be max 1 000 000.",
    itemVolumeNotInteger: "Item volume must be an integer number.",
    itemCostTooLow: "Item cost must be at least 0.",
    itemCostTooHigh: "Item cost must be max 10 000.",
    itemVendorCostTooLow: "Item vendor cost must be at least 0.",
    itemVendorCostTooHigh: "Item vendor cost must be max 10 000.",
    itemNpcPurchasePriceTooLow: "Item npc purchase price must be at least 0.",
    itemNpcPurchasePriceTooHigh: "Item npc purchase price must be max 10 000.",
    itemNotExists: "Such item not exists.",
    itemAdded: (short: string) => `Item: ${short} has been added.`,
    itemUpdated: (short: string) => `Item: ${short} has been updated.`,
    itemDeleted: (short: string) => `Item: ${short} has been deleted.`,
    noTypeProvided: "Item type must be provided.",
    multipleItemsAdded: (count: number) => `New items added: ${count}`,
    multipleItemsAddedAndUpdated: (added: number, updated: number) =>
      `New items added: ${added}, items updated: ${updated}`,
  },
  date: {
    invalidDate: "Invalid date format.",
  },
  privileges: {
    enemies: {
      category: "Enemies",
      getEnemies: "get enemies list",
      addEnemies: "add new enemies",
      editEnemies: "edit enemies",
      deleteEnemies: "delete enemies",
    },
    keyGiverDrops: {
      category: "Keygiver drops",
      getKeyGiverDrops: "get keygiver drops list",
      addKeyGiverDrops: `add new keygiver drops from last ${config.keyGiverDrops.maxAddTime} hours`,
      editKeyGiverDrops: `edit keygiver drops from last ${config.keyGiverDrops.maxEditTime} hours`,
      deleteKeyGiverDrops: `delete keygiver drops from last ${config.keyGiverDrops.maxEditTime} hours`,
    },
    keyGivers: {
      category: "Keygivers",
      getKeyGivers: "get keygivers list",
      addKeyGivers: "add new keygivers",
      editKeyGivers: `edit keygivers from last ${config.keyGiverDrops.maxEditTime} hours`,
      deleteKeyGivers: "delete keygivers",
    },
    keys: {
      category: "Keys",
      getKeys: "get keys list",
      addKeys: "add new keys",
      editKeys: "edit keys",
      deleteKeys: "delete keys",
    },
    items: {
      category: "Items",
      getItems: "get items list",
      addItems: "add new items",
      editItems: "edit items",
      deleteItems: "delete items",
    },
    locations: {
      category: "Locations",
      getLocations: "get locations list",
      addLocations: "add new locations",
      editLocations: "edit locations",
      deleteLocations: "delete locations",
    },
    settings: {
      category: "Settings",
      changePassword: "change roles password",
      createBackup: "create backup",
      restoreBackup: "restore backup",
      changeSettings: "change settings",
    },
  },
};
