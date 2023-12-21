const express = require('express');
const app = express();
const port = 3000;
const bookRoutes = require('./src/routes/book');

app.use(express.json());
app.use('/', bookRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});