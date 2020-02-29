import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CreateDailyLog from './create-daily-log/CreateDailyLog';
import ViewDailyLog from './view-daily-log/ViewDailyLog';
import DailyLogs from './daily-logs/DailyLogs';

const DailyLog: React.FC = () => {
    return (
        <>
            <h2>Daily Log</h2>

            <Switch>
                <Route exact path={`/daily-log/create`}>
                    <CreateDailyLog />
                </Route>
                <Route path={`/daily-log/:id`}>
                    <ViewDailyLog />
                </Route>
                <Route exact path={`/daily-log`}>
                    <DailyLogs />
                </Route>
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </>
    );
};

export default DailyLog;
