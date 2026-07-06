import { getDb } from "../database";


export const getAllMedicalbyPetId = async (petId) => {
  try {
    const db = await getDb();
    const result = await db.getAllAsync(
      `select * from medical where petId = ?`,
      [+petId]
    );
    return result;
  } catch (error) {
    console.log("Get all medical by pet ID error:", error);
    throw error;
  }
};

export const addAMedical = async (petId, medicalName, date, startDate, endDate) => {
  try {
    const db = await getDb();
    await db.runAsync(
      `insert into medical (
        petId,
        date, 
        medicalName,
        startDate,
        endDate
      ) values (?, ?, ?, ?, ?)`,
      [+petId, date, medicalName, startDate, endDate]
    );
  } catch (error) {
    console.log("Add a medical error:", error);
    throw error;
  }
};

export const deleteAMedical = async (id) => {
  try {
    const db = await getDb();
    await db.runAsync(`delete from medical where id = ?`, [+id]);
  } catch (error) {
    console.log("Delete a medical error:", error);
    throw error;
  }
};
