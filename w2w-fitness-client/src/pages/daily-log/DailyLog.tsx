import React from 'react';
import { Link, useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import CreateDailyLog from './create-daily-log/CreateDailyLog';

const DailyLog: React.FC = () => {
    const match = useRouteMatch();
    const matchPath: string = (match && match.path) || window.location.pathname;
    console.log('useRouteMatch', match);

    return (
        <>
            <h2>DailyLog</h2>

            <Switch>
                <Route path={`${matchPath}/create`}>
                    <CreateDailyLog />
                </Route>
                <Route exact path={matchPath}>
                    <Link to={`${matchPath}/create`}>Create New Term</Link>

                    <h3>TODO: List will go here</h3>
                </Route>
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </>
    )
}

export default DailyLog;
