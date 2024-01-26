import mongoose, { Schema, Document } from 'mongoose';

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
  avatar?: string;
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
  avatar: { type: String },
}, {
  toObject: { virtuals: true }
});

export default mongoose.model<IWorker>('Worker', WorkerSchema);


