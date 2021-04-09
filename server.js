const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: false }));

// Routes
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/points', require('./routes/points'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
