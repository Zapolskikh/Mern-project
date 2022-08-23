import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import {LinksPage} from './pages/LinksPage';
import {CreatePage} from './pages/CreatePage';
import { DetailPage } from './pages/DetailPage';
import { AuthPage } from './pages/AuthPage';

import {Routes as Switch} from 'react-router-dom';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <BrowserRouter>
            <Switch>
                <Route path='/links' exact>
                    <LinksPage />
                </Route>
                <Route path='/create' exact>
                    <CreatePage />
                </Route>
                <Route path='/detail/:id'>
                    <DetailPage/>
                </Route>
            </Switch>
            </BrowserRouter>
        )
    }
    return (
        <Switch>
       <Route path ='/' exact>
        <AuthPage/>
        </Route>
        </Switch>

    )
};