import 'module-alias/register';
import App from '@src/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute()]);

app.run();
