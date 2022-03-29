import express from 'express'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
import cors from 'cors'

async function startDatabaseConnection() {
	try {
		const uri = 'mongodb://root:rootpassword@localhost:27017'
		const dbClient = new MongoClient(uri)
		await dbClient.connect()
		console.log('Connected successfully to database')
		return dbClient
	} catch (err) {
		console.error(err)
	}
}

function startBackendApp(db) {
	try {
		const app = express()
		app.use(bodyParser.json())
		app.use(cors())
		const port = 3000

		app.put('/user', async (request, response) => {
			try {
				const payload = request.body
				payload.createdAt = new Date()
				const dbResponse = await db.collection('user').insertOne(request.body)
				response.json({ success: true, content: dbResponse })
			} catch (err) {
				console.error(err)
				response.json({ success: false, content: err.message })
			}
		})

		app.get('/users', async (request, response) => {
			try {
				const dbResponse = await db.collection('user').find({}).toArray()
				response.json({ success: true, content: dbResponse })
			} catch (err) {
				console.error(err)
				response.json({ success: false, content: err.message })
			}
		})

		app.get('/users/auth/:login/:password', async (request, response) => {
			try {
				const { login, password } = request.params
				const dbResponse = await db.collection('user').findOne({ login, password })
				response.json({ success: true, content: dbResponse })
			} catch (err) {
				console.error(err)
				response.json({ success: false, content: err.message })
			}
		})

		app.get('/', async (request, response) => {
			try {
				// await db.db('admin').command({ ping: 1 })
				response.send('Test OK!')
			} catch (err) {
				console.error(err)
				response.json({ success: false, content: err.message })
			}
		})

		app.listen(port, () => {
			console.log(`Example app listening on port ${port}`)
		})
	} catch (err) {
		console.error(err)
	}
}

const mongoDBClient = await startDatabaseConnection()
startBackendApp(mongoDBClient.db('simple_crud'))
