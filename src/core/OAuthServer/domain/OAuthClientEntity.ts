export interface OAuthClient {
    id: string;
    redirectUris?: string | string[] | undefined;
    grants: string | string[];
    accessTokenLifetime?: number | undefined;
    refreshTokenLifetime?: number | undefined;
    clientSecret?: string;
}  