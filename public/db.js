let db;
// create a new db request for a "budget" database.
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = (event) => {
    // create object store called "pending" and set autoIncrement to true
   const db = event.target.result;
   db.createObjectStore("pending", { autoIncrement: true });
 };
 
 request.onsuccess = (event) =>{
   db = event.target.result;
 
   // check if app is online before reading from db
   if (navigator.onLine) {
     checkDatabase();
   }
 };

 request.onerror = function(event) {
    console.log("Oh no! " + event.target.errorCode);
  };
  
  function saveRecord(record) {
    // create a transaction on the pending db with readwrite access
    const transaction = db.transaction(["pending"], "readwrite");
  
    // access your pending object store
    const store = transaction.objectStore("pending");
  
    // add record to your store with add method.
    store.add(record);
  }