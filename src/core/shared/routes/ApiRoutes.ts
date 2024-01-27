import { Router } from "express";
import userCredentialRoute from "../../UserCredential/application/route";
import workerRoute from "../../Worker/application/route";
import recruiterRoute from "../../Recruiter/application/route";
const route = Router();

route.use('/user',userCredentialRoute)
route.use('/worker',workerRoute);
route.use('/recruiter', recruiterRoute);

export default route