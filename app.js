


//const mongoose = require('mongoose'); //подключаем монгодб
const { MongoClient, ServerApiVersion } = require('mongoose');

const express = require('express'); //подклюбчаем фреймворк экспресс для работы с нод



const config = require('config'); //подключаем папку конфиг (после подключения нпм конфиг)
const PORT = config.get('port') || 4000; //из папки конфиг получаем нужну. строчку, 5000 если не определен

const app = express(); // наш будующий сервер

app.use('/api/auth', require('./routes/auth.routes')); //передаем строчку префикс для будующего пути


async function start() {   
    try {   //пытается выполнить тру, в случае неудачи кэтч
        const client = new MongoClient(config.get('mongoUri'), 
        { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        client.connect(err => {
          const collection = client.db("test").collection("devices");
          // perform actions on the collection object
          client.close();
        });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`)); //port 5000, then return callback
    } catch (e) {   //е - значение исключения
        console.log('server error', e.message);
        process.exit(1);   //Завершение процесса
    }
}
start();

