// utils/redis.js

const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    // Display any errors in the console
    this.client.on('error', (error) => {
      console.error('Redis client error:', error);
    });
  }

  // Function to check if the connection to Redis is successful
  isAlive() {
    return this.client.connected;
  }

  // Asynchronous function to get a value from Redis by key
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (error, value) => {
        if (error) {
          reject(error);
        } else {
          resolve(value || 'null'); // Return 'null' if value is null or undefined
        }
      });
    });
  }

  // Asynchronous function to set a value in Redis with expiration
  async set(key, value, durationInSeconds) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', durationInSeconds, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }

  // Asynchronous function to delete a value from Redis by key
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (error, reply) => {
        if (error) {
          reject(error);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

// Create and export an instance of RedisClient called redisClient
const redisClient = new RedisClient();
module.exports = redisClient;
