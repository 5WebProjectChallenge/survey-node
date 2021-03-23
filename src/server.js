

import 'dotenv/config'
import express from 'express'
import morgan from 'morgan' // For logging
import helmet from 'helmet' // For setting security headers
// const session = require('express-session')

import routes from './routes'
import isAuthenticated from './utils/isAuth'

const app = express()

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }))

app.use(helmet())
app.use(morgan('combined'))

app.use(express.json('limit','50mb'))
app.use(express.urlencoded({extended:true,limit:'50mb'}))


app.use('/user',routes.survey)

app.use((req,res)=>{
    res.status(404).send('404 page not found')
})

app.listen(process.env.PORT,()=>{
    console.log("App is onn at ", process.env.PORT)
})