import { connectDB } from '../DB/connection.js';
import authRouter from './modules/auth/auth.router.js'
import { globalErrorHandler } from './utils/errorHandler.js';
import userRouter from './modules/user/user.router.js'



export const bootstrap = (app, express) => {

    app.use(express.json())

    app.use('/auth', authRouter)
    app.use('/user', userRouter)

    app.use(globalErrorHandler);

    app.use('*root', (req, res, next) => {
        return res.send('404 Not Found')
    })

    connectDB()
}