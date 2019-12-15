import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import { getAllLogs } from '../../api';
import CreateDailyLog from './create-daily-log/CreateDailyLog';
import Log from '../../../../w2w-fitness-server/src/server/entity/Log';

const DailyLog: React.FC = () => {
    // It looks like React isn't batching multiple `useState` update invocations because they're in an async callback
    // So let's just use a localState object instead of one hook per state value ¯\_(ツ)_/¯
    // This object method causes 2 total renders instead of 3+ (verified via useRef)
    const [localState, setLocalState] = useState<{ loading: boolean, logs: Log[] }>({
        loading: true,
        logs: [],
    })

    const match = useRouteMatch();
    const matchPath: string = match?.path ?? window.location.pathname;

    useEffect(() => {
        getAllLogs()
            .then((res: Log[]) => {
                setLocalState({
                    loading: false,
                    logs: res,
                })
            })
            .catch(alert);
    }, [])

    return (
        <>
            <h2>Daily Log</h2>

            <Switch>
                <Route path={`${matchPath}/create`}>
                    <CreateDailyLog />
                </Route>
                <Route exact path={matchPath}>
                    <Link to={`${matchPath}/create`}>Create New Term</Link>

                    {localState.loading ?
                        <h4>Loading...</h4> :
                        <ul>
                            {localState.logs.map((log: Log) =>
                                <li>{log.date}</li>
                            )}
                        </ul>
                    }
                </Route>
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </>
    )
}

export default DailyLog;
