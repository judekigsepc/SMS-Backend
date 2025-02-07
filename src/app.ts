import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import schoolRouter from './routes/school.route'
import adminRouter from './routes/admin.route'
import { checkEnvironmentVairables } from './utils/validation/validate'

const envVariableArray = ['JWT_SECRET','DB_URL','PORT']
checkEnvironmentVairables(envVariableArray)

const app = express()

const dbUrl = process.env.DB_URL
const port = process.env.PORT

const dbConnect = async ():Promise<void> => {
      try {
        console.log('Connecting to database')

        if(!dbUrl) {
          console.log('DATABASE URL NOT FOUND')
          return
        }

        await mongoose.connect(dbUrl)
            console.log('Connected to database successfuly')
            return
        
      }catch(err){
        console.error(err)
        return
      }
}

await dbConnect()

app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req:Request, res:Response) => {
        res.status(200).send('School management system server up and running')
})

app.use('/api/schools', schoolRouter)
app.use('/api/admin',adminRouter)

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})