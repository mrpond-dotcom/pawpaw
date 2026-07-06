import { getDb } from "../database";

export const getAllWeightbyPetId = async (petId) => {
  try {
    const db = await getDb();
    const result = await db.getAllAsync(
      `select * from weight where petId = ?`,
      [+petId]
    );
    return result;
  } catch (error) {
    console.log("Get all weight by pet ID error:", error);
    throw error;
  }
};

export const getAllWeightForADate = async (petId) => {
  try {
    const db = await getDb();
    const result = await db.getAllAsync(
      `select * from weight where petId = ?`,
      [+petId]
    );
    return result;
  } catch (error) {
    console.log("Get all weight for a date error:", error);
    throw error;
  }
};

export const addWeight = async (petId, weight, date) => {
  try {
    const db = await getDb();
    await db.runAsync(
      `insert into weight (
        petId,
        date, 
        weight
      ) values (?, ?, ?)`,
      [+petId, date, weight]
    );
  } catch (error) {
    console.log("Add weight error:", error);
    throw error;
  }
};

export const deleteAWeight = async (id) => {
  try {
    const db = await getDb();
    await db.runAsync(`delete from weight where id = ?`, [+id]);
  } catch (error) {
    console.log("Delete a weight error:", error);
    throw error;
  }
};


