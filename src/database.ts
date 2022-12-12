import { hashSync } from 'bcrypt';
import { connect, model, Schema } from 'mongoose';

console.log('Connecting to the database');
connect('mongodb://mongo:27017', { user: 'admin', pass: 'admin' }).then(() =>
  console.log('Connected to the database')
);

const userValidation = async (value: string): Promise<boolean> => {
  const user = await User.exists({ _id: value }).exec();
  return !user;
};

const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
    validate: { validator: userValidation, message: 'El usuario con este ID ya existe' },
  },
  hash: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePicture: { type: String, required: true },
});
const User = model('User', userSchema);

export const createUser = async (
  email: string,
  password: string,
  name: string,
  lastName: string,
  profilePicture: string
) => {
  const hash = hashSync(password, 10);
  await new User({ _id: email, hash, name, lastName, profilePicture }).save();
};

export const updateUser = async (
  email: string,
  data: { password?: string; name?: string; lastName?: string; profilePicture?: string }
) => {
  await User.updateOne({ _id: email }, { $set: data }).exec();
};

export const deleteUser = async (email: string) => {
  await User.deleteOne({ _id: email }).exec();
};

export const getUser = async (email: string) => {
  const user = await User.findById(email).exec();
  if (!user) throw new Error('No hay usuario con ese email');
  return user;
};

export const getUsers = async () => User.find({}).exec();
