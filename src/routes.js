import React from 'react';
import { Route, IndexRoute } from 'react-router';
import NotFoundPage from './components/NotFoundPage';

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={IndexPage}/>
        <Route path="*" component={NotFoundPage}/>
    </Route>
);

export default routes;