//http://localhost:3000/report/generate
const express = require('express');
const bodyParser = require('body-parser');
const reportRoutes = require('./Routes/reportRoutes');

const app = express();

app.use(bodyParser.json());

app.use('/report', reportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
