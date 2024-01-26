import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IWorker extends Document {
  id: string;
  name?: string;
  surname?: string;
  email: string;
  phoneNumber?: string;
  sex?: string;
  employment?:string;
  description?: string;
  province?:string;
  city?:string;
  postalCode?: string;
  address?: string;
}

const WorkerSchema: Schema = new Schema({
  id: { type: String,required: true, unique: true  },
  name: { type: String },
  surname: { type: String },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  sex: { type: String },
  employment: { type: String },
  description: { type: String },
  province: { type: String },
  city: { type: String },
  postalCode: { type: String },
  address: { type: String },
}, {
  toObject: { virtuals: true }
});

export default mongoose.model<IWorker>('Worker', WorkerSchema);


