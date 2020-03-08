import LogDomain from '../../domain/LogDomain';

const resolver = {
    async getAllLogs() {
        const logs = await new LogDomain().getAllLogs();
        return logs;
    },
    hello() {
       return {
           text: 'Hello World',
           views: 52,
       };
    },
};

export default resolver;
