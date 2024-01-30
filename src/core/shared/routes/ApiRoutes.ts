import { Router } from "express";
import userCredentialRoute from "../../UserCredential/application/route";
import workerRoute from "../../Worker/application/route";
import recruiterRoute from "../../Recruiter/application/route";
import uploadFilesRoute from "../../shared/upload/UploadRoute";
import clientRoute from "../../OAuthServer/application/route";
import oauthRoute from "../../OAuthServer/application/route/oauthRoute";
const route = Router();

route.use('/user',userCredentialRoute)
route.use('/worker',workerRoute);
route.use('/recruiter', recruiterRoute);
route.use('/upload', uploadFilesRoute)
route.use(clientRoute);
route.use(oauthRoute);

export default route