import { OAuthClient, OAuthToken } from '../../domain';
import { ITokenRepository } from '../../domain/ITokenRepository';
import { UserCredentialEntity as User } from '../../../UserCredential/domain/UserCredentialEntity';

export class OAuthModel {
  constructor(private tokenRepository:ITokenRepository) {}

  public  getAccessToken = async(accessToken: string): Promise<OAuthToken | null> => {
    const token = await this.tokenRepository.getAccessToken(accessToken);
    return token
  }

  public getClient = async (clientId: string, clientSecret: string): Promise<OAuthClient | null> => {
    const client = await this.tokenRepository.getClient(clientId, clientSecret);
    return client;
  }

  public getUser = async (username: string, password: string): Promise<User | null> => {
    const client = await this.tokenRepository.getUser(username, password);
    return client;
  }

  public saveToken = async (token: OAuthToken, client: OAuthClient, user: User): Promise<OAuthToken | null> => {
    const savedToken = await this.tokenRepository.saveAccessToken(token, client, user);
    return savedToken;
  }

  public verifyScope = async (token: OAuthToken, scope: string | string[]): Promise<boolean> =>{
    const result = await this.tokenRepository.verifyScope(token, scope);
    return result;
  }

  public getRefreshToken = async(refreshToken: string): Promise<OAuthToken | null> => {
    const refreshTokened = await this.tokenRepository.getRefreshToken(refreshToken);
    return refreshTokened;
  }

  public generateAccessToken = async(client: OAuthClient, user: User, scope: string | string[]): Promise<string> => {
    const accessToken = await this.tokenRepository.generateAccessToken(client, user, scope);
    return accessToken;
  }

  public generateRefreshToken = async(client: OAuthClient, user: User, scope: string | string[]): Promise<string> => {
    const refreshToken = await this.tokenRepository.generateRefreshToken(client, user, scope);
    return refreshToken;
  }

}

