// utils/db.js

const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}`;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.isConnected = false;

    // Connect to MongoDB
    this.client.connect()
      .then(() => {
        console.log('Connected to MongoDB');
        this.isConnected = true;
      })
      .catch(error => {
        console.error('Error connecting to MongoDB:', error);
      });
  }

  // Check if connection to MongoDB is successful
  isAlive() {
    return this.isConnected;
  }

  // Asynchronous function to get the number of documents in the users collection
  async nbUsers() {
    try {
      const db = this.client.db();
      const count = await db.collection('users').estimatedDocumentCount();
      return count;
    } catch (error) {
      console.error('Error getting number of users:', error);
      return 0;
    }
  }

  // Asynchronous function to get the number of documents in the files collection
  async nbFiles() {
    try {
      const db = this.client.db();
      const count = await db.collection('files').estimatedDocumentCount();
      return count;
    } catch (error) {
      console.error('Error getting number of files:', error);
      return 0;
    }
  }
}

// Create and export an instance of DBClient called dbClient
const dbClient = new DBClient();
module.exports = dbClient;
