import { OAuthToken, OAuthClient } from '../domain/';
import { UserEntity } from '../../User/domain/UserEntity';
import { UserCredentialEntity as User } from '../../UserCredential/domain/UserCredentialEntity';


export interface ITokenRepository {
  getAccessToken(accessToken: string): Promise<OAuthToken | null>;
  saveAccessToken(token: OAuthToken, client: OAuthClient, user: UserEntity): Promise<OAuthToken>;
  getRefreshToken(refreshToken: string): Promise<OAuthToken | null>;
  getClient(clientId: string, clientSecret: string): Promise<OAuthClient | null>;
  verifyScope(token: OAuthToken, scope: string | string[]): Promise<boolean>;
  getUser(username: string, password: string): Promise<User | null>;
  generateAccessToken(client: OAuthClient, user: User, scope: string | string[]): Promise<string>;
  generateRefreshToken(client: OAuthClient, user: User, scope: string | string[]): Promise<string>;
}