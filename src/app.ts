import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

const app = express()

const dbUrl = process.env.DB_URL
const port = process.env.PORT

const dbConnect = async ():Promise<void> => {
      try {
        console.log('Connecting to database')
        if(dbUrl) {
            await mongoose.connect(dbUrl)
            console.log('Connected to databse successfuly')
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

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})