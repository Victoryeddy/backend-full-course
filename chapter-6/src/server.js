import app from "./app.js"
const PORT = process.env.PORT || 8383;

app.listen(PORT, () => console.log(`Port Running on ${PORT}`));