import express from "express";
import path from 'path';
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todo.js";
import authMiddleWare from "./middleware/auth.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));
const PORT = process.env.PORT || 8383;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use('/auth', authRoutes);
app.use('/todos', authMiddleWare, todoRoutes);

// Listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

/*
Application Level Middleware

app.use(helmet()); // Security headers
app.use(cors()); // Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies

Router Middleware

app.use('/api', apiRouter); // Apply to specific routes
app.use('/admin', adminRouter);

Error Middleware

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

Auth Middleware

app.use((req, res, next) => {
  const token = req.headers.authorization;
  
  if (token) {
    // Verify token and attach user to request
    req.user = verifyToken(token);
  }
  
  next();
});


// Rate limiting middleware
app.use((req, res, next) => {
  const ip = req.ip;
  if (requestCount[ip] > 100) {
    return res.status(429).send('Too many requests');
  }
  requestCount[ip]++;
  next();
});

Built-In Middleware

app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.static('public')); // Serve static files
*/


/*
-- CREATE (make new table)
CREATE TABLE table_name (column1 TYPE, column2 TYPE);

-- INSERT (add new data)
INSERT INTO table_name (col1, col2) VALUES (val1, val2);

-- SELECT (read data)
SELECT column1, column2 FROM table_name WHERE condition;

-- UPDATE (modify data)
UPDATE table_name SET column1 = value1 WHERE condition;

-- DELETE (remove data)
DELETE FROM table_name WHERE condition;
 */
