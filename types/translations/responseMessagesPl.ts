import { config } from "../../config/config";

export const messagesPl = {
  default: "Coś poszło nie tak.",
  auth: {
    wrongRole: "Taka rola nie istnieje.",
    wrongPassword: "Błędne hasło.",
    unauthorized: "Brak dostępu.",
    logout: "Wylogowałeś się.",
    login: "Zalogowałeś się.",
  },
  settings: {
    backupKeepMonthsTooLowNumber:
      "Minimalma liczba miesięcy przechowywania backupu to 2.",
    backupKeepMonthsNotANumber: "Wartość miesięcy musi być liczbą całkowitą.",
    settingsChanged: "Ustawienia zostały zmienione",
    settingsNotExists: "Ustawienia nie istnieją. Utwórz je.",
  },
  backups: {
    saved: (fileName: string) => `Backup został zapisany do pliku: ${fileName}`,
    noBackupsToDelete: "Brak plików backupu do usunięcia.",
    backupsDeleted: (count: number) => `Usunięto plików backupu: ${count}`,
    fileNotExists: (fileName: string) =>
      `Plik backupu: ${fileName} nie istnieje`,
    backupRestored: (fileName: string) =>
      `Plik backupu: ${fileName} został wczytany`,
  },
  users: {
    noRolesInDb: "No roles found in database. Contact with admin.",
    passwordChanged: "Password has been changed.",
    passwordMinLengthError: "Password must be at least 5 characters long.",
    passwordRequiredError: "Password is required.",
  },
  enemies: {
    enemyExists: (name: string) => `Wróg ${name} już istnieje.`,
    enemyNotExists: "Taki wróg nie istnieje.",
    enemyAdded: (name: string) => `Wróg ${name} został dodany.`,
    nameIsRequired: "Podaj imię wroga.",
    enemyDeleted: (name: string) => `Wróg ${name} został usunięty.`,
    enemyUpdated: (name: string) =>
      `Wróg ${name ? name + " " : name}został uaktualniony.`,
    wrongNameProvided: "Błędne imię.",
    nameTooLong: "Imię powinno mieć maksymalnie 30 znaków.",
    shortTooLong: "Opis powinien mieć maksymalnie 50 znaków.",
    commentTooLong: "Komentarz powinien mieć maksymalnie 4000 znaków.",
    wrongRace: "Niepoprawna rasa.",
    wrongProfession: "Niepoprawny zawód.",
    wrongGuild: "Niepoprawne stowarzyszenie.",
    wrongLevel: "Niepoprawny poziom.",
    wrongWeapon: "Niepoprawna broń.",
  },
  location: {
    locationAdded: (locationId: number) =>
      `Lokacja ${locationId} została dodana.`,
    locationNotExists: "Taka lokacja nie istnieje.",
    locationDeleted: (locationId: number) =>
      `Lokacja ${locationId} została usunięta.`,
    locationUpdated: (locationId: number) =>
      `Lokacja ${locationId} została zaktualizowana.`,
    locationIdIsRequired: "Id lokacji jest wymagany.",
    locationNotANumber: "Id lokacji musi być liczbą całkowitą.",
    locationNumberNotInRange: "Id lokacji musi być liczbą w przedziale 0-99999",
    nameTooLong: "Nazwa lokacji może mieć maksymalnie 50 znaków.",
    wrongDomain: "Zła domena.",
    descriptionTooLong: "Opis musi mieć maksymalnie 4000 znaków.",
    commentTooLong: "Komentarz musi mieć maksymalnie 4000 znaków.",
    bindsTooLong: "Każdy bind musi mieć maksymalnie 100 znaków.",
  },
  keyGivers: {
    keyGiverExists: (name: string) => `Klucznik ${name} istnieje.`,
    keyGiverNotExists: "Taki klucznik nie istnieje.",
    nameIsRequired: "Nazwa jest wymagana.",
    nameExists: "Nazwa klucznika już istnieje. Wybierz inną.",
    nameTooLong: "Nazwa powinna mieć maksymalnie 80 znaków.",
    shortTooLong: "Short powinien mieć maksymalnie 50 znaków.",
    descriptionTooLong: "Opis musi mieć maksymalnie 4000 znaków.",
    respawnTimeNotANumber: "Czas odrodzenia musi być liczbą godzin.",
    wrongDomain: "Wprowadzono błędną domenę.",
    wrongLocationIdProvided: "Jedno lub więcej id lokacji jest niepoprawnych.",
    locationNotExist: "Jedna lub więcej lokacji nie istnieje.",
    playersToCompleteNotInRange: "Liczba graczy musi być z przedziału 0-20",
    commentTooLong: "Komentarz musi mieć maksymalnie 4000 znaków.",
    keyGiverAdded: "Klucznik został dodany.",
    keyGiverUpdated: "Klucznik został zaktualizowany.",
    keyGiverDeleted: (name: string) => `Klucznik ${name} został usunięty.`,
  },
  keys: {
    keyExists: (name: string) => `Klucz: ${name} istnieje. Wybierz inny.`,
    keyNotExists: "Taki klucz nie istnieje.",
    nameTooLong: "Nazwa powinna mieć maksymalnie 80 znaków.",
    nameIsRequired: "Nazwa jest wymagana.",
    wrongTreasuryIdProvided: "Id skarbca jest niepoprawne.",
    wrongDomain: "Niepoprawna nazwa domeny.",
    commentTooLong: "Komentarz musi mieć maksymalnie 4000 znaków.",
    descriptionTooLong: "Opis musi mieć maksymalnie 4000 znaków.",
    treasuryNameTooLong: "Nazwa skarbca musi mieć maksymalnie 80 znaków.",
    keyAdded: (name: string) => `Klucz: ${name} został dodany.`,
    keyUpdated: (name: string) => `Klucz: ${name} został zaktualizowany.`,
    keyDeleted: (name: string) => `Klucz: ${name} został usunięty.`,
  },
  keyGiverDrops: {
    keyGiverDropIdIsRequired: "Id klucznika jest wymagane.",
    keyGiverDropNotExists: "Drop nie istnieje.",
    keyGiverDropTooOldToDelete: "Drop jest zbyt stary by można było go usunąć.",
    dropTooOldToAdd: (time: number) =>
      `Możesz dodać maksymalnie ${time} godzinny drop.`,
    dropTooOldToEdit: (time: number) =>
      `Możesz edytować maksymalnie ${time} godzinny drop.`,
    keyNotExists: "Podany klucz nie istnieje.",
    keyGiverNotExists: "Podany klucznik nie istnieje.",
    keyGiverDropAdded: "Drop został dodany.",
    keyGiverDropUpdated: "Drop został zaktualizowany.",
    keyGiverDropDeleted: "Drop został usunięty.",
  },
  items: {
    nameTooLong: "Nazwa powinna mieć maksymalnie 50 znaków.",
    itemShortExists: (short: string) =>
      `Przedmiot: ${short} istnieje. Wybierz inny szort.`,
    shortTooLong: "Szort powinien mieć maksymalnie 50 znaków.",
    shortIsRequired: "Szort jest wymagany.",
    invalidType: "Zły typ przedmiotu.",
    typeIsRequired: "Typ przedmiotu jest wymagany.",
    invalidWeaponType: "Zły typ broni.",
    invalidWeaponHand: "Zła wartość chwytu broni.",
    invalidArmorClass: "Zła wartość klasy pancerza.",
    invalidDurability: "Zła wartość przetrwania przedmiotu.",
    specialBonusTooLong:
      "Specjalne właściwości mogą mieć maksymalnie 400 znaków.",
    occurrenceTooLong:
      "Występowanie przedmiotu może mieć maksymalnie 200 znaków.",
    descriptionTooLong: "Opis musi mieć maksymalnie 4000 znaków.",
    commentTooLong: "Komentarz musi mieć maksymalnie 4000 znaków.",
    weaponEffectivenessTooLow: "Skuteczność broni nie może być mniejsza niż 1.",
    weaponEffectivenessTooHigh:
      "Skuteczność broni nie może być większa niż 14.",
    weaponBalanceTooLow: "Wyważenie broni nie może być mniejsze niż 1.",
    weaponBalanceTooHigh: "Wyważenie broni nie może być większe niż 14.",
    armorResTooLow:
      "Jakość ochrony przed obrażeniami nie może być mniejsza niż 1.",
    armorResTooHigh:
      "Jakość ochrony przed obrażeniami nie może być większa niż 12.",
    shieldParryTooLow: "Parowanie tarczy nie może być mniejsze niż 1.",
    shieldParryTooHigh: "Parowanie tarczy nie może być większe niż 12.",
  },
  date: {
    invalidDate: "Nieprawidłowy format daty.",
  },
  privileges: {
    enemies: {
      category: "Wrogowie",
      getEnemies: "pobierać listę wrogów",
      addEnemies: "dodawać nowych wrogów",
      editEnemies: "edytować informacje o wrogach",
      deleteEnemies: "usuwać wrogów",
    },
    keyGiverDrops: {
      category: "Dropy",
      getKeyGiverDrops: "pobierać listę dropów",
      addKeyGiverDrops: `dodawać nowe dropy z ostatnich ${config.keyGiverDrops.maxAddTime} godzin`,
      editKeyGiverDrops: `edytować dropy z ostatnich ${config.keyGiverDrops.maxEditTime} godzin`,
      deleteKeyGiverDrops: `usuwać dropy z ostatnich ${config.keyGiverDrops.maxEditTime} godzin`,
    },
    keyGivers: {
      category: "Klucznicy",
      getKeyGivers: "pobierać listę kluczników",
      addKeyGivers: "dodawać kluczników",
      editKeyGivers: "edytować kluczników",
      deleteKeyGivers: "usuwać kluczników",
    },
    keys: {
      category: "Klucze",
      getKeys: "pobierać listę kluczy",
      addKeys: "dodawać klucze",
      editKeys: "edytować klucze",
      deleteKeys: "usuwać klucze",
    },
    locations: {
      category: "Lokacje",
      getLocations: "pobierać listę lokacji",
      addLocations: "dodawać lokacje",
      editLocations: "edytować informacje o lokacjach",
      deleteLocations: "usuwać lokacje",
    },
    settings: {
      category: "Ustawienia",
      changePassword: "zmieniać hasło ról",
      createBackup: "tworzyć backup",
      restoreBackup: "przywracać backup",
      changeSettings: "zmieniać ustawienia",
    },
  },
};
