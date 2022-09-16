import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import EntriesRoute from './routes/entries.route';
import UserRoute from './routes/user.route';

validateEnv();

const app = new App([new IndexRoute(), new UserRoute(), new AuthRoute(), new EntriesRoute()]);

app.listen();
