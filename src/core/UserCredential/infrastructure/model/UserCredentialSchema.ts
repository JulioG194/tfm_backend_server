/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'dotenv/config'
import mongoose, { Schema, type Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

const ENV_SALT = process.env.SALT ?? '10'

export interface IUserCredential extends Document {
  id: string;
  username: string
  password: string
  role?: string
  permissions?: string[]
  createdAt?: Date
  updatedAt?: Date
  loginAttempts: number
  lockUntil: number | null
}

const UserCredentialSchema: Schema = new Schema({
  id: { type: String, unique: true },
  username: { type: String, required: true, unique: true,  
              match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/, 'Por favor ingrese un correo electrónico válido'] },
  password: { type: String, required: true, validate: {
    validator: function(v: string | any[]) {
      return v.length >= 8; // Asegúrate de que el password tenga al menos 8 caracteres
    },
    message: 'La contraseña debe tener al menos 8 caracteres'
  } },
  role: { type: String },
  permissions: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Number, default: null }
}, {
  timestamps: true
})

/* UserCredentialSchema.virtual('id').get(function () {
  return this._id
})

UserCredentialSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id
    delete ret.__v
  }
}) */

UserCredentialSchema.set('toObject', { virtuals: true })

UserCredentialSchema.pre<IUserCredential>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(parseInt(ENV_SALT))
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

UserCredentialSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model<IUserCredential>('UserCredential', UserCredentialSchema)