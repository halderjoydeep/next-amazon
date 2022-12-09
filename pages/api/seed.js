import User from '../../models/user-model';
import data from '../../utils/data';
import db from '../../utils/db';

async function handler(req, res) {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await db.disconnect();
  res.send({ message: 'Seeded successfully' });
}

export default handler;
