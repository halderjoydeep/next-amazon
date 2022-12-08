import mongoose from 'mongoose';

console.log(process.env.MONGODB_URI);

const connection = {};

const connect = async () => {
  if (connection.isConnected) {
    console.log('Already connected');
    return;
  }
  if (mongoose.connection.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Use previous connection');
      return;
    }
    await mongoose.disconnect();
  }
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((db) => {
      console.log('New Connection');
      connection.isConnected = db.connections[0].readyState;
    })
    .catch((err) => console.log(err));
};

const disconnect = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
};

const db = { connect, disconnect };
export default db;
