import OAuthServer from 'oauth2-server';
import  {OAuthModel} from '../../infraestructure/models/model';
import { TokenRepository } from '../../infraestructure/repositoryImpl/MongoOAuthServerRepository';

const tokenRepository = new TokenRepository();
const oauthModel = new OAuthModel(tokenRepository);

const oauth = new OAuthServer({
  model: oauthModel,
  accessTokenLifetime: 60 * 5, // 1h
  refreshTokenLifetime: 60 * 60 * 24 * 7, // 7days
});

export default oauth;