import { openDB, IDBPDatabase } from 'idb';
import type { StoredImage } from '../types';

const DB_NAME = 'DigitalSoulDB';
const STORE_NAME = 'soul-images';
const DB_VERSION = 1;
const MAX_IMAGES = 50;

let dbPromise: Promise<IDBPDatabase<unknown>> | null = null;

const initDB = () => {
  if (dbPromise) return dbPromise;
  
  dbPromise = openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('timestamp', 'timestamp');
      }
    },
  });
  return dbPromise;
};

export const addImage = async (imageUrl: string): Promise<StoredImage> => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    // Enforce the 50 images limit
    const count = await store.count();
    if (count >= MAX_IMAGES) {
        // Get the oldest image's key and delete it
        const oldestImageCursor = await store.index('timestamp').openCursor(null, 'next');
        if (oldestImageCursor) {
            await store.delete(oldestImageCursor.primaryKey);
        }
    }

    const newImage: StoredImage = { url: imageUrl, timestamp: Date.now() };
    const id = await store.add(newImage);
    await tx.done;
    
    // FIX: Cast the IDBValidKey to number, as we are using autoIncrement.
    return { ...newImage, id: id as number };
};


export const getAllImages = async (): Promise<StoredImage[]> => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const allImages = await store.getAll();
    await tx.done;

    // Return sorted by newest first
    return allImages.sort((a, b) => b.timestamp - a.timestamp);
};
