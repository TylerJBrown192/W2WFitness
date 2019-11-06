import cors from 'cors';
import express from 'express';


// Configure Server
const app = express();
app.use(cors());


// Routes
// TODO: Break routes out per model once Terminology is feature complete
app.get('/terminology', (req, res) => {
    res.send('dj khaled anotha one');
});

app.post('/terminology', (req, res) => {
    res.json('another');
});


// Init Server
app.listen(process.env.PORT || 3001, () => {

    console.log(`Server is listening on port ${process.env.PORT || 3001}`);
});
