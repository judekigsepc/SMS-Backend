import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import schoolRouter from './routes/school.route'

const app = express()

const dbUrl = process.env.DB_URL
const port = process.env.PORT

const dbConnect = async ():Promise<void> => {
      try {
        console.log('Connecting to database')
        if(dbUrl) {
            await mongoose.connect(dbUrl)
            console.log('Connected to database successfuly')
            return
        }
        console.log('DATABASE URL NOT FOUND')
      }catch(err){
        console.error(err)
        return
      }
}

await dbConnect()

app.get('/', (req:Request, res:Response) => {
        res.status(200).send('School management system server up and running')
})

app.use('/api/schools', schoolRouter)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})