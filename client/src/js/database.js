import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Create a connection to the database and version we want to use.
  const contactDb = await openDB('jate', 1);

  // Create a new transaction and specify db and data type.
  const tx = contactDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Add the data to the object store.
  const request = store.put({ id: 1, value: content });

  // Wait for the transaction to complete.
  const result = await request;
  console.log('🚀 - data saved!', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the db and version we want to use.
  const contactDb = await openDB('jate', 1);

  // Create a new transaction and specify db and data type.
  const tx = contactDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Get all the data from the object store.
  const request = store.getAll();

  // Wait for the transaction to complete.
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};


initdb();
