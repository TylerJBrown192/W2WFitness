// tslint:disable: interface-name

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        GITHUB_AUTH_TOKEN: string;
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        PWD: string;
        JWT_SECRET: string;
        POSTGRES_DB_PORT: string;
      }
    }

    namespace Express {
        interface Request {
            user: {
                userId: number;
                email: string;
                iat: number;
                exp: number;
            };
        }
    }
}

export {};
