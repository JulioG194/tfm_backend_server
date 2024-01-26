import mongoose, { Schema, Document } from 'mongoose';

export interface IRecruiter extends Document {
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

const RecruiterSchema: Schema = new Schema({
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

export default mongoose.model<IRecruiter>('Recruiter', RecruiterSchema);


