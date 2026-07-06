import { getDb } from "../database";

export const getAllVaccinebyPetId = async (petId) => {
  try {
    const db = await getDb();
    const result = await db.getAllAsync(
      `select * from vaccine where petId = ?`,
      [+petId]
    );
    return result;
  } catch (error) {
    console.log("Get all vaccine by pet ID error:", error);
    throw error;
  }
};

export const addAVaccine = async (petId, vaccineName, date) => {
  try {
    const db = await getDb();
    await db.runAsync(
      `insert into vaccine (
        petId,
        date, 
        vaccineName
      ) values (?, ?, ?)`,
      [+petId, date, vaccineName]
    );
  } catch (error) {
    console.log("Add a vaccine error:", error);
    throw error;
  }
};

export const deleteAVaccine = async (id) => {
  try {
    const db = await getDb();
    await db.runAsync(`delete from vaccine where id = ?`, [+id]);
  } catch (error) {
    console.log("Delete a vaccine error:", error);
    throw error;
  }
};
