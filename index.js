import mongoose from 'mongoose'
import MongodbMemoryServer from 'mongodb-memory-server'
import {app} from './app'

const PORT = 3005

const MONGO_DB_NAME = 'jest'
const mongod = new MongodbMemoryServer({
  instance: {
    dbName: MONGO_DB_NAME,
  },
  binary: {
    version: '3.6.3',
  },
})

mongod.getConnectionString().then(mongoDbUrl => {
  mongoose.connect(mongoDbUrl)
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function() {
    app.listen(PORT, () => {
      console.log(`Started on port ${PORT}`)
    })
  })
})
