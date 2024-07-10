import { openDB } from "idb";

const dbPromise = openDB("loans-db", 1, {
  upgrade(db) {
    db.createObjectStore("loans", { keyPath: "id" });
  },
});

export const saveData = async (data) => {
  const db = await dbPromise;
  const tx = db.transaction("loans", "readwrite");
  await tx.store.put({ id: 1, data });
  await tx.done;
};

export const getData = async () => {
  const db = await dbPromise;
  return (await db.transaction("loans").store.get(1))?.data;
};
