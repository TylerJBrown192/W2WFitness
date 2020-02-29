import React, { useEffect, useState } from 'react';
import { getLogById } from '../../../api';
import { useParams, Link } from 'react-router-dom';
import Log from '../../../../../w2w-fitness-server/src/server/entity/Log';
import { format } from 'date-fns';

const ViewDailyLog: React.FC = () => {
    let { id } = useParams();
    const [localState, setLocalState] = useState<{ loading: boolean, log: Log | null }>({
        loading: true,
        log: null,
    });

    useEffect(() => {
        getLogById(id)
            .then((res: Log) => {
                setLocalState({
                    loading: false,
                    log: res,
                })
            })
            .catch(alert);
    }, [id])

    return (
        <>
            <Link to={`/daily-log/create`}>Create New Log</Link>

            {localState.loading ?
                <h4>Loading...</h4> :
                <>
                    <h4>Log for: {format(new Date(localState.log.date), 'EEEE, MMMM do, yyy')}}</h4>
                </>
            }
        </>
    );
}

export default ViewDailyLog;