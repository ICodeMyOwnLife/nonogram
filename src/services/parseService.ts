import Parse from 'parse';
import config from 'config';

Parse.initialize('nonogram');
Parse.serverURL = config.BE_BASE_URL;

export default Parse;
