import { UserEntity as User } from "../../User/domain/UserEntity";
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
  