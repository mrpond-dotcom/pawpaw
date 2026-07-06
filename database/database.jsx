import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";

let db;

export const getDb = async () => {
  if (Platform.OS === "web") {
    throw new Error("SQLite is not supported on web platform");
  }
  
  if (!db) {
    db = await SQLite.openDatabaseAsync("db.db");
  }
  return db;
};

export const dbInit = async () => {
  const database = await getDb();
  
  try {
    await database.execAsync(`
      create table if not exists myPets (
        id integer primary key not null, 
        name text, 
        spicie text,
        photoURL text,
        birthDate text,
        breed text,
        gender text,
        weight text,
        ownerName text
      );

      create table if not exists activities (
        id integer primary key not null,
        petId integer,
        activityType text,
        date text,
        note text,
        startTime text,
        endTime text,
        calorie text,
        meter text
      );

      create table if not exists medical (
        id integer primary key not null, 
        petId integer,
        date text,
        startDate text,
        endDate text,
        medicalName text
      );

      create table if not exists vaccine (
        id integer primary key not null, 
        petId integer,
        date text,
        vaccineName text
      );

      create table if not exists vet (
        id integer primary key not null, 
        petId integer,
        date text
      );

      create table if not exists weight (
        id integer primary key not null, 
        petId integer,
        date text,
        weight text
      );
    `);
  } catch (error) {
    console.log("Database initialization error:", error);
    throw error;
  }
};

export const dropDatabase = async () => {
  const database = await getDb();
  
  try {
    await database.execAsync(`
      drop table if exists myPets;
      drop table if exists activities;
      drop table if exists medical;
      drop table if exists vaccine;
      drop table if exists vet;
      drop table if exists weight;
    `);
  } catch (error) {
    console.log("Drop database error:", error);
    throw error;
  }
};
