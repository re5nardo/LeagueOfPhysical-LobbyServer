import 'reflect-metadata';
import App from '@src/app';
import IndexRoute from '@routes/index.route';
import UserRoute from '@routes/user.route';
import UserLocationRoute from '@routes/user-location.route';
import LobbyRoute from '@routes/lobby.route';
import validateEnv from '@utils/validateEnv';
import { logger } from '@utils/logger';
import loader from '@loaders/index';

(async () => {
    try {
        validateEnv();

        await loader();

        const app = new App([new IndexRoute(), new UserRoute(), new UserLocationRoute(), new LobbyRoute()]);

        app.listen();
    } catch (error) {
        logger.error(`main error. error: ${error}`);
    }
})();
