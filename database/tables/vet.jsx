import { getDb } from "../database";

export const getAllVetbyPetId = async (petId) => {
  try {
    const db = await getDb();
    const result = await db.getAllAsync(
      `select * from vet where petId = ?`,
      [+petId]
    );
    return result;
  } catch (error) {
    console.log("Get all vet by pet ID error:", error);
    throw error;
  }
};

export const addVet = async (petId, date) => {
  try {
    const db = await getDb();
    await db.runAsync(
      `insert into vet (
        petId,
        date
      ) values (?, ?)`,
      [+petId, date]
    );
  } catch (error) {
    console.log("Add vet error:", error);
    throw error;
  }
};

export const deleteAVet = async (id) => {
  try {
    const db = await getDb();
    await db.runAsync(`delete from vet where id = ?`, [+id]);
  } catch (error) {
    console.log("Delete a vet error:", error);
    throw error;
  }
};
