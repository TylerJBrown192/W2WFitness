import cors from 'cors';
import express from 'express';


// Configure Server
const app = express();
app.use(cors());


// Routes
app.get('/', (req, res) => {
    // console.log(" I GOT YOU YOU MOTHERFUCKER");
    res.send('dj khaled anotha one');
});


// Init Server
app.listen(process.env.PORT || 3000, () => {

    console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});
