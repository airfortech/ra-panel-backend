import { Status, messages } from "../../types/responseMessages";
import { Request } from "../../types/Request";
import { ItemsAddFormRequest } from "../../types/Item";
import { ItemTypes } from "../../types/ItemTypes";
import { Response } from "express";
import { Item } from "../../db/models/Item";
import { addWeapon } from "./weapon/addWeapon";
import { addArmor } from "./armor/addArmor";
import { addShield } from "./shield/addShield";

export const addItems = async (req: Request, res: Response) => {
  try {
    const { items, task } = req.body as ItemsAddFormRequest;
    let message = "";
    const unifiedItems = items
      .map(item =>
        item.type === ItemTypes.weapon
          ? addWeapon(item, ItemTypes.weapon, item.short)
          : item.type === ItemTypes.armor
          ? addArmor(item, ItemTypes.armor, item.short)
          : item.type === ItemTypes.shield
          ? addShield(item, ItemTypes.shield, item.short)
          : null
      )
      .filter(Boolean);

    // INFO: add many items in one operation with db
    const addedItems = await Item.insertMany(unifiedItems, {
      // INFO: skip existing items
      ordered: false,
    });

    if (task === "addNew") {
      // message = messages[req.lang].items.itemAdded;
      message = messages[req.lang].items.multipleItemsAdded(addedItems.length);
    } else {
      const operations = unifiedItems
        .filter(
          item => !addedItems.find(addedItem => addedItem.short === item.short)
        )
        .map(item => {
          let itemToUpdate = null;
          if (task === "updateAll") itemToUpdate = item;
          else {
            const {
              short,
              weaponSlashingDamage,
              weaponPiercingDamage,
              weaponBluntDamage,
              weaponEffectiveness,
              weaponBalance,
              armorSlashingRes,
              armorPiercingRes,
              armorBluntRes,
              shieldParry,
              ...restValues
            } = item;
            if (task === "updateInfosOnly") {
              console.log("restValues", { ...restValues });
              itemToUpdate = {
                short,
                ...restValues,
              };
              console.log("itemToUpdate", itemToUpdate);
            } else if (task === "updateValuesOnly")
              itemToUpdate = {
                short,
                weaponSlashingDamage,
                weaponPiercingDamage,
                weaponBluntDamage,
                weaponEffectiveness,
                weaponBalance,
                armorSlashingRes,
                armorPiercingRes,
                armorBluntRes,
                shieldParry,
              };
          }
          return {
            updateOne: {
              filter: { short: item.short },
              update: itemToUpdate,
              // INFO: if true, and no documents found, insert a new document, bulkWrite can provide conflict with true
              upsert: false,
            },
          };
        });
      // INFO: Sends multiple insertOne, updateOne, updateMany, replaceOne, deleteOne, and/or deleteMany operations to the MongoDB server in one command. This is faster than sending multiple independent operations (e.g. if you use create()) because with bulkWrite() there is only one round trip to MongoDB.
      const updatedItems = await Item.bulkWrite(operations);
      message = messages[req.lang].items.multipleItemsAddedAndUpdated(
        addedItems.length,
        updatedItems.modifiedCount
      );
    }

    return res.status(200).json({
      status: Status.success,
      message: message,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};
