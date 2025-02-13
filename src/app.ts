import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

import schoolRouter from './routes/school.route.js'
import adminRouter from './routes/admin/admin.route.js'
import { checkEnvironmentVairables } from './utils/validation/validate.js'

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

dbConnect()

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