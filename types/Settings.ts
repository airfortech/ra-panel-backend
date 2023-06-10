export interface Settings {
  autoDeleteBackup: boolean;
  backupKeepMonths: number;
  backupDays: number[];
}

export type SettingsResponse = Settings;

export interface SettingsRequest
  extends Omit<
    Settings,
    "autoDeleteBackup" | "backupKeepMonths" | "backupDays"
  > {
  autoDeleteBackup?: boolean;
  backupKeepMonths?: number;
  backupDays?: number[];
}
