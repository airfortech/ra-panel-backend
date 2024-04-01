import { Item } from "../../../../../db/models/Item";

export const getMagicItems = async () => {
  try {
    const items = await Item.find({ isMagic: true });
    return items.map(({ id }) => id as string);
  } catch (e) {
    throw e;
  }
};
