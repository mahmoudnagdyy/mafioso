import express from 'express'
import dotenv from 'dotenv'
import { bootstrap } from './src/index.router.js'
import cors from "cors";
dotenv.config()

const app = express()

app.use(cors({origin: '*'}));


app.get('/', (req, res, next) => {
    return res.send('Hello World!')
})


bootstrap(app, express)



app.listen(process.env.PORT, () => console.log(`Server is running on port .... ${process.env.PORT}`))