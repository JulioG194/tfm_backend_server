import { UserCredentialEntity as User } from "../../UserCredential/domain/UserCredentialEntity";
import { OAuthClient as Client } from "./OAuthClientEntity";

export interface OAuthToken {
  accessToken: string;
  accessTokenExpiresAt?: Date | undefined;
  refreshToken?: string | undefined;
  refreshTokenExpiresAt?: Date | undefined;
  scope?: string | string[] | undefined;
  client: Client;
  user: User;
  }
  