//The address of this server is 'http://localhost:8383'
import express from 'express'
const app = express();

const PORT = 8383;

// Middleware
app.use(express.json());  // -> configures our endpoint to expect json data

// ENDPOINT -> HTTP Verbs(methods) and Routes (Paths)
app.get('/', (req, res) => {
  res.sendStatus(200);
  // res.json({ message: 'Hello from API!' });
})

app.post('/api/data', (req, res) => {
   const body = req.body;
   console.log(body);
   res.sendStatus(201);
})
app.post('/api/data-v2', (req, res) => {
  res.status(201).send('Worked')
})


app.listen(PORT, () => console.log(`Yes server active on ${PORT}`));