import { getDb } from "../database";

export const getMyPets = async () => {
  try {
    const db = await getDb();
    const result = await db.getAllAsync(`select * from myPets`);
    return result;
  } catch (error) {
    console.log("Get my pets error:", error);
    throw error;
  }
};

export const addAPet = async (pet) => {
  try {
    const db = await getDb();
    const result = await db.runAsync(
      `insert into myPets (
        name,
        spicie, 
        photoURL,
        birthDate, 
        breed,
        gender,
        weight,
        ownerName) values(?,?,?,?,?,?,?,?)`,
      [
        pet.name,
        pet.spicie,
        pet.photoURL,
        pet.birthDate,
        pet.breed,
        pet.gender,
        pet.weight,
        pet.ownerName,
      ]
    );
    return result.lastInsertRowid;
  } catch (error) {
    console.log("Add a pet error:", error);
    throw error;
  }
};



export const deleteAPet = async (id) => {
  try {
    const db = await getDb();
    await db.execAsync(`
      delete from myPets where id = ?;
      delete from vet where petId = ?;
      delete from weight where petId = ?;
      delete from vaccine where petId = ?;
      delete from medical where petId = ?;
      delete from activities where petId = ?;
    `, [+id, +id, +id, +id, +id, +id]);
  } catch (error) {
    console.log("Delete a pet error:", error);
    throw error;
  }
};
