import React, { useState, useEffect } from 'react';
import Log from '../../../../../w2w-fitness-server/src/server/entity/Log';
import { getAllLogs } from '../../../api';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const DailyLog = () => {
    // It looks like React isn't batching multiple `useState` update invocations one after another because they're in an async callback
    // So let's just use a localState object instead of one hook per state value ¯\_(ツ)_/¯
    // This object method causes 2 total renders (one on load, and one on data retrieval) instead of 3+ (verified via useRef)
    const [localState, setLocalState] = useState<{ loading: boolean, logs: Log[] }>({
        loading: true,
        logs: [],
    })

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
            <Link to={`/daily-log/create`}>Create New Log</Link>

            {localState.loading ?
                <h4>Loading...</h4> :
                <ul>
                    {localState.logs.map((log: Log) =>
                        <li key={log.id}>
                            <Link to={`/daily-log/${log.id}`}>{format(new Date(log.date), 'MMM do (EEEE), yyy')}</Link>
                        </li>
                    )}
                </ul>
            }
        </>
    )
}

export default DailyLog;