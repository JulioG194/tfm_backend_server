
import 'dotenv/config';
import { ITokenRepository } from '../../domain/ITokenRepository' ; 
import { OAuthClient, OAuthToken } from '../../domain';
import { UserCredentialEntity as User } from '../../../UserCredential/domain/UserCredentialEntity';
import OAuthTokenSchema from '../models/OAuthTokenSchema';
import OAuthClientSchema from '../models/OAuthClientSchema';
import UserCredentialSchema from '../../../UserCredential/infrastructure/model/UserCredentialSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const MAX_LOGIN_ATTEMPTS = process.env.MAX_LOGIN_ATTEMPTS || '3'; // max attempts
const LOCK_TIME = process.env.LOCK_TIME || '3600000'; // 2hours
const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY || 's3cr3t';
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY || 's3cr3tr3fr3sh';

export class TokenRepository implements ITokenRepository {
  async getUser(username: string, password: string): Promise<User | null> {
    const user = await UserCredentialSchema.findOne({ username }).exec();
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    if (user.lockUntil && user.lockUntil > Date.now()) {
        throw new Error('La cuenta está bloqueada temporalmente');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        user.loginAttempts += 1;
        if (user.loginAttempts >= parseInt(MAX_LOGIN_ATTEMPTS)) {
            user.lockUntil = Date.now() + parseInt(LOCK_TIME);
        }
        await user.save();
        throw new Error('Contraseña incorrecta');
    }
    if (user.loginAttempts > 0 || user.lockUntil) {
        user.loginAttempts = 0;
        user.lockUntil = null;
        await user.save();
    }
    const userFound = {
          id: user.id,
          username: user.username,
          role: user.role,
          permissions: user.permissions
        }
        return userFound;  
  }
  
  async getAccessToken(accessToken: string): Promise<OAuthToken | null> {
    const tokenDocument = await OAuthTokenSchema.findOne({ accessToken: accessToken}).exec();
    if (!tokenDocument) return null;
    const client = await OAuthClientSchema.findById(tokenDocument.client).exec();
    const user = await UserCredentialSchema.findById(tokenDocument.user).exec();
    const token: OAuthToken = {
      accessToken: tokenDocument.accessToken,
      accessTokenExpiresAt: tokenDocument.accessTokenExpiresAt,
      refreshToken: tokenDocument.refreshToken,
      refreshTokenExpiresAt: tokenDocument.refreshTokenExpiresAt,
      client: client as OAuthClient,
      user: user as User
    };
    return token;
  }
  async saveAccessToken(token: OAuthToken, client: OAuthClient, user: User): Promise<OAuthToken> {
    const tokenDocument = new OAuthTokenSchema({
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      client: client.id,
      user: user.id
    });
    await tokenDocument.save();
    const oauthToken: OAuthToken =  {
      accessToken: tokenDocument.accessToken,
      accessTokenExpiresAt: tokenDocument.accessTokenExpiresAt,
      refreshToken: tokenDocument.refreshToken,
      refreshTokenExpiresAt: tokenDocument.refreshTokenExpiresAt,
      client: client,
      user: user
    };
    return oauthToken;
  }
  async getRefreshToken(refreshToken: string): Promise<OAuthToken | null> {
    const tokenDocument = await OAuthTokenSchema.findOne({ refreshToken: refreshToken}).exec();
    if (!tokenDocument) return null;
    const client = await OAuthClientSchema.findById(tokenDocument.client).exec();
    const user = await UserCredentialSchema.findById(tokenDocument.user).exec();
    const token: OAuthToken = {
      accessToken: tokenDocument.accessToken,
      accessTokenExpiresAt: tokenDocument.accessTokenExpiresAt,
      refreshToken: tokenDocument.refreshToken,
      refreshTokenExpiresAt: tokenDocument.refreshTokenExpiresAt,
      client: client as OAuthClient,
      user: user as User
    };
    return token;
  }
  
  async getClient(clientId: string, clientSecret: string): Promise<OAuthClient | null> {
    const oauthclientDocument = await OAuthClientSchema.findOne({ id: clientId, clientSecret: clientSecret }).exec();
    if (!oauthclientDocument) return null;
    const client: OAuthClient = {
      id: oauthclientDocument.id,
      redirectUris: oauthclientDocument.redirectUris,
      grants: oauthclientDocument.grants,
      accessTokenLifetime: oauthclientDocument.accessTokenLifetime,
      refreshTokenLifetime: oauthclientDocument.refreshTokenLifetime
  };
  return client;
  }
  async verifyScope(token: OAuthToken, scope: string | string[]): Promise<boolean> {
    if(!token.scope) return false;
    let requestedScopes;
    if (Array.isArray(scope)) {
      requestedScopes = scope;
    } else {
      requestedScopes = scope.toString().split(' ');
    }
    let authorizedScopes: string | string[];
    if (Array.isArray(token.scope)) {
      authorizedScopes = token.scope;
    } else {
      authorizedScopes = token.scope.toString().split(' ');
    }
    return requestedScopes.every(s => authorizedScopes.indexOf(s) >= 0);
  }

  async generateAccessToken(client: OAuthClient, user: User, scope: string | string[]): Promise<string>{
    const payload = {
      clientId: client.id,
      userId: user.id,
      scope: scope
    };
    const options = {
      expiresIn: '1h'
    };
    const jwtToken = jwt.sign(payload, ACCESS_SECRET_KEY, options);
    return jwtToken;
  }


  async generateRefreshToken(client: OAuthClient, user: User, scope: string | string[]): Promise<string>{
    const payload = {
      clientId: client.id,
      userId: user.id,
      scope: scope
    };
    const options = {
      expiresIn: '7d'
    };
    const jwtToken = jwt.sign(payload, REFRESH_SECRET_KEY, options);
    return jwtToken;
  }

}
