import mongoose from 'mongoose';
import User from '../../models/user-model';
import db from '../../utils/db';

async function handler(req, res) {
  if (req.method === 'POST') {
    await db.connect();
    const user = await User.findOne({ email: req.body.email });
    res.send({ name: user.name });
    await db.disconnect();
  }
}

export default handler;
