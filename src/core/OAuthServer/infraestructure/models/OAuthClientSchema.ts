import mongoose, { Schema, Document } from 'mongoose';

interface IOAuthClient extends Document {
  id: string;
  redirectUris?: string | string[];
  grants: string | string[];
  accessTokenLifetime?: number;
  refreshTokenLifetime?: number;
  clientSecret?: string;
}

const OAuthClientSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  redirectUris: { type: [String], default: [] },
  grants: { type: [String], required: true },
  accessTokenLifetime: { type: Number },
  refreshTokenLifetime: { type: Number },
  clientSecret: { type: String },
});


export default mongoose.model<IOAuthClient>('OAuthClient', OAuthClientSchema);