import amqp from 'amqplib';

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'test_queue';

    await channel.assertQueue(queue, { durable: true });

    // 发送消息
    channel.sendToQueue(queue, Buffer.from('Hello RabbitMQ!'));

    console.log('Message sent to RabbitMQ');

    return channel;
  } catch (err) {
    console.error('Error connecting to RabbitMQ:', err);
    throw err;
  }
};

export default connectRabbitMQ;
