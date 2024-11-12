import amqp from 'amqplib';

let channel: amqp.Channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertQueue('task_queue', { durable: true });
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
};

const sentToQueue = async (msg: string) => {
  channel.sendToQueue('task_queue', Buffer.from(msg), { persistent: true })
}

export { connectRabbitMQ, sentToQueue };