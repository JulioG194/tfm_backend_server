import mongoose, { Schema, Document } from 'mongoose';

export interface IJobEntity extends Document {
  id: string;
  title?: string;
  image?: string;
  description?: string;
}

const JobSchema: Schema = new Schema({
  id: { type: String,required: true, unique: true  },
  title: { type: String, required: false },
  image: { type: String, required: false },
  description: { type: String, required: false },
});

export default mongoose.model<IJobEntity>('Job', JobSchema);
