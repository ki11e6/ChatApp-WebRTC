import dotenv from 'dotenv';
import users from './data/usersData.js';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    //delete all before new entries
    await User.deleteMany();
    //create fresh entries
    await User.insertMany(users);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
  console.log('function disabled');
} else {
  importData();
}
// The process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched.
