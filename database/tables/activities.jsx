import { getDb } from "../database";

export const getAllActivities = async (petId) => {
  try {
    const db = await getDb();
    const result = await db.getAllAsync(
      `select * from activities where petId = ? order by date DESC`,
      [+petId]
    );
    return result;
  } catch (error) {
    console.log("Get all activities error:", error);
    throw error;
  }
};

// export const getATypeOfActivities = (petId, type) => {
//   const promise = new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         `select * from activities where petId = ? and activityType = ?`,
//         [petId, type],
//         (_, { rows }) => {
//           resolve(rows._array);
//         },
//         (_, err) => {
//           console.log(err);
//           reject(err);
//         }
//       );
//     });
//   });
//   return promise;
// };

export const getActivitiesForADate = async (petId, date) => {
  try {
    const dateObj = date.split("T")[0];
    const db = await getDb();
    const result = await db.getAllAsync(
      `select * from activities where petId = ? and SUBSTR(date,1, 10) = ?`,
      [+petId, dateObj]
    );
    return result;
  } catch (error) {
    console.log("Get activities for a date error:", error);
    throw error;
  }
};

export const addAnActivity = async (petId, activity) => {
  try {
    const db = await getDb();
    await db.runAsync(
      `insert into activities (
        petId,
        activityType,
        date,
        note,
        startTime,
        endTime,
        calorie,
        meter) values(?,?,?,?,?,?,?,?)`,
      [
        +petId,
        activity.activityType,
        activity.date,
        activity.note,
        activity.startTime,
        activity.endTime,
        activity.calorie,
        activity.meter,
      ]
    );
  } catch (error) {
    console.log("Add an activity error:", error);
    throw error;
  }
};

export const deleteAActivity = async (id) => {
  try {
    const db = await getDb();
    await db.runAsync(`delete from activities where id = ?`, [+id]);
  } catch (error) {
    console.log("Delete an activity error:", error);
    throw error;
  }
};

export const getVetVaccinationByPetiD = async (petId, date) => {
  try {
    const dateObj = date.split("T")[0];
    const db = await getDb();
    const result = await db.getAllAsync(
      `select * from activities 
      where petId = ? 
      and activityType in ('vet', 'vaccine') 
      and SUBSTR(date,1, 10) = ?`,
      [+petId, dateObj]
    );
    return result;
  } catch (error) {
    console.log("Get vet vaccination by pet ID error:", error);
    throw error;
  }
};
