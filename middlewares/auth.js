
import { passport } from '../utils/auth';
import session from './session';

const auths = [session, passport.initialize(), passport.session()];
console.log('auths', auths)

export default auths;
