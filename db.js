// db.js - IndexedDB Wrapper
export const DB = {
  dbName: "BlueChatDB",
  async init() {
    return new Promise((resolve) => {
      const request = indexedDB.open(this.dbName, 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        db.createObjectStore("messages", { keyPath: "id" });
      };
      request.onsuccess = () => resolve(request.result);
    });
  },

  async saveMessage(msg) {
    const db = await this.init();
    const tx = db.transaction("messages", "readwrite");
    tx.objectStore("messages").put(msg);
  }
};

// Relay Logic (Simple Deduplication)
const seenMessages = new Set();
export function shouldProcess(msgId) {
  if (seenMessages.has(msgId)) return false;
  seenMessages.add(msgId);
  return true;
}