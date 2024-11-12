import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// init redist client
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || '',
  db: 0,
})

redis.on('connection', () => console.log('Redis connected'));

redis.on('error', (err) => console.log('Redis error: ', err));

export default redis;