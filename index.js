const express = require('express')
const app = express();

app.get('/', (req, res) => res.send('Hello from base2 and SimpleTask!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
