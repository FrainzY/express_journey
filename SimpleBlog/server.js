const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const usersRouter = require('./routes/usersRoutes');
const postsRouter = require('./routes/postRoutes');
const commentsRouter = require('./routes/commentRoutes');

dotenv.config({path: './config.env'})

sequelize.authenticate()
    .then(() => console.log('Postgresql Connected'))
    .catch(err => console.log('DB Connection Error', err))

const app = express()
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
//app.use('/api/likes', likesRouter);

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('App listening on port ' + port);
});