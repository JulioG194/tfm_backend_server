import mongoose, { Schema, Document } from 'mongoose';

interface IOAuthToken extends Document {
    accessToken: string;
    accessTokenExpiresAt?: Date;
    refreshToken?: string;
    refreshTokenExpiresAt?: Date;
    scope?: string | string[];
    client: string;
    user: string;
}

const OAuthTokenSchema: Schema = new Schema({
    accessToken: { type: String, required: true, unique: true },
    accessTokenExpiresAt: { type: Date },
    refreshToken: { type: String },
    refreshTokenExpiresAt: { type: Date },
    scope: {
        type: [String],
        default: []
    },
    client: { type: String , ref: 'OAuthClient', required: true },
    user: { type: String , ref: 'UserCredential', required: true }
});

export default mongoose.model<IOAuthToken>('OAuthToken', OAuthTokenSchema);