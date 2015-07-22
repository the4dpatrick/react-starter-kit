import ReactRouter from 'react-router';
import routes from './routes';

var router = ReactRouter.create({
    location : ReactRouter.HistoryLocation,
    routes : routes
});

export default router;