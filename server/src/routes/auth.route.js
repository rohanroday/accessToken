import {Router} from 'express';
import {registerUser, loginUser, refresh, getUser} from '../controllers/auth.controller.js';
import {registerValidator, loginValidator} from '../validators/auth.validator.js';



const router = Router();

router.post('/register', registerValidator, registerUser);
router.post('/login', loginValidator, loginUser);
router.post('/refresh', refresh);

router.get('/me', getUser);


export default router;