import { server } from "./app.js";

const PORT = process.env.PORT || 8383;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
