import Parse from 'parse';
import { APP_BASE_URL } from 'constants/url';

Parse.initialize('nonogram');
Parse.serverURL = APP_BASE_URL;

export default Parse;
