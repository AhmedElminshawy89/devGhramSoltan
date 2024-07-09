// db.js
import { openDB } from 'idb';

const dbPromise = openDB('loan-database', 1, {
  upgrade(db) {
    db.createObjectStore('loans', {
      keyPath: 'id',
      autoIncrement: true,
    });
    db.createObjectStore('offline-operations', {
      keyPath: 'id',
      autoIncrement: true,
    });
  },
});

export const getDb = () => dbPromise;
