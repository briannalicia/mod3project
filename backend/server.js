const express = require('express')
const cors = require('cors')

require('dotenv').config()

const mongoConfig = require('./config')

const Log = require("./models/Log")

mongoConfig()

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const { authorize } = require('./middleware/authMiddleware')

const app = express()

const PORT = 8080

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/api/users', authorize, userRoutes)


// "index" route
app.get('/api/logs', async (req, res) => {
    try {
        console.log("its working")
        const logs = await Log.find()
        res.status(200).json(logs)
        
    } catch(err) {
        console.log(err.message)
        res.status(400).json(err)
    }
})

// "create" route
app.post('/api/logs', async (req, res) => {
    try {
        console.log('POST /api/logs')
        console.log(req.body)
        const logs = await Log.create(req.body)
        res.status(200).json(logs)
    } catch(err) {
        console.log(err.message)
        res.status(400).json(err)
    }
})

// "show" route

app.get('/api/logs/:id', async (req, res) => {
    try {
        console.log("its working")
        const logs = await Log.findById(req.params.id)
        res.status(200).json(logs)
        
    } catch(err) {
        console.log(err.message)
        res.status(400).json(err)
    }
})

// "delete" route
app.delete('/api/logs/:id', async (req, res) => {
    try {
        console.log('DELETE /api/logs/:id')
        await Log.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'successfully deleted' })
    } catch(err) {
        console.log(err.message)
        res.status(400).json(err)
    }
})

// "update" route
app.put('/api/logs/:id', async (req, res) => {
    try {
        console.log('PUT /api/logs/:id')
        await Log.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ message: 'successfully updated' })
    } catch(err) {
        console.log(err.message)
        res.status(400).json(err)
    }
})

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
})

