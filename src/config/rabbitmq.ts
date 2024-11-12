import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

// 创建 RabbitMQ 连接
const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect({
      protocol: 'amqp',
      hostname: process.env.RABBITMQ_HOST || 'localhost',
      port: process.env.RABBITMQ_PORT || 5672,
      username: process.env.RABBITMQ_USER || 'guest',
      password: process.env.RABBITMQ_PASSWORD || 'guest',
    });

    const channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');

    // 你可以在这里设置你的队列
    const queueName = 'taskQueue';
    await channel.assertQueue(queueName, { durable: true });  // 保证队列持久化

    return { connection, channel };
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
    process.exit(1);
  }
};

export default connectRabbitMQ;
