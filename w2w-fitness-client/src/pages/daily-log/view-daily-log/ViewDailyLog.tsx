import React, { useEffect, useState } from 'react';
import { getLogById } from '../../../api/logs';
import { useParams, Link } from 'react-router-dom';
import Log from '../../../../../w2w-fitness-server/src/server/entity/Log';
import { format } from 'date-fns';

const ViewDailyLog: React.FC = () => {
    const { id } = useParams();
    const [localState, setLocalState] = useState<{ loading: boolean; log?: Log | null; error?: string }>({
        loading: true,
        log: null,
        error: null,
    });

    console.log('rend?');

    useEffect(() => {
        const fetchLog = async (): Promise<void> => {
            try {
                const log = await getLogById(id);

                setLocalState({
                    loading: false,
                    log,
                });
            } catch (err) {
                setLocalState({
                    loading: false,
                    error: `${err.name}: ${err.message}`,
                });
            }
        };

        fetchLog();
    }, [id]);

    return (
        <>
            <Link to={`/daily-log/create`}>Create New Log</Link>

            {localState.loading ? (
                <h4>Loading...</h4>
            ) : (
                <>
                    {localState.error ? (
                        <h4>Got error: {localState.error}</h4>
                    ) : (
                        <h4>Log for: {format(new Date(localState.log.date), 'EEEE, MMMM do, yyy')}</h4>
                    )}
                </>
            )}
        </>
    );
};

export default ViewDailyLog;
