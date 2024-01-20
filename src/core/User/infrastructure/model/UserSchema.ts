import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
  name: string;
  surname: string;
  email: string;
  birthdate: Date;
  cellphone: string;
  gender: string;
}

const UserSchema: Schema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  birthdate: { type: Date, required: true },
  cellphone: { type: String, required: true },
  gender: { type: String, required: true },
  
}, {
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  },
  toObject: { virtuals: true }
});

export default mongoose.model<IUser>('User', UserSchema);


