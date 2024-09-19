import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
    origin: ['http://localhost:5173','http://localhost:5174'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

export default corsOptions;
