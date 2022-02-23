import 'module-alias/register';
import App from '@src/app';
import IndexRoute from '@routes/index.route';
import UserRoute from '@routes/user.route';
import UserMatchRoute from '@routes/user.match.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UserMatchRoute(), new UserRoute()]);

app.listen();
