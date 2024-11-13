import Redis from 'ioredis';
const redis = new Redis.default({
  host: '127.0.0.1',
  port: 6379,
  password: '12314',
  db: 0,
});

redis.on('connect', () => {
  console.log('connection to redis established');
})

redis.on('error', (e) => {
  console.log('redis error', e);
})
export default redis;
