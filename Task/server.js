const express = require('express');
const dotenv = require('dotenv');
const usersRouter = require('./routes/usersRoutes');
const tasksRouter = require('./routes/tasksRoutes');
const sequelize = require('./config/database');

dotenv.config({path: './config.env'});

sequelize.authenticate()
    .then(() => console.log('Postgresql Connected'))
    .catch(err => console.log('DB Connection Error', err))

const app = express();
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App listening on port ' + port);
});


