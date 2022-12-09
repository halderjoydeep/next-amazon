import mongoose from 'mongoose';
const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log('Already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Using existing connection');
      return;
    }
    await mongoose.disconnect();
  }

  const conn = await mongoose.connect(process.env.MONGODB_URI);
  console.log('new connection');
  connection.isConnected = conn.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      console.log('disconnecting');
    } else {
      console.log('not disconnected');
      return;
    }
  }
}

const db = { connect, disconnect };
export default db;
