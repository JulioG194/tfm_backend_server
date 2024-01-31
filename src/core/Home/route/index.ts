import { Router } from 'express';
import { HomeController } from '../controller';


const route = Router();

const homeController = new HomeController();

route.get('/', homeController.homeCtrl);

export default route;