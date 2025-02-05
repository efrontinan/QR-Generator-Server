import authRouter from './auth.routes';
export default (app) => {
    app.use('/api', authRouter);
};
