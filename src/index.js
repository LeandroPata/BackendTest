const express = require('express')
const paymentRoutes = require('./router/paymentRoutes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(bodyParser.json());
app.use('/payments', paymentRoutes);

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(PORT, () => {
    console.log('API is listening on port', PORT);
});
