const express = require('express');
const app = express();
const port = process.env.PORT ?? 3001;

app.use(express.static('public'))
app.use(express.json());

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

// routes
require('./public/routes/auth.routes')(app);
