const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

  app.use(
    cors({
      origin: "*",
    })
  );
  
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(bodyParser.json());

const mockProducts = [
    { id: 1, name: "Smartphone", category: "Tech", rating: 4.5 },
    { id: 2, name: "Yoga Mat", category: "Fitness", rating: 4.7 },
    { id: 3, name: "Espresso Maker", category: "Home", rating: 4.3 }
  ];
  
app.get('/recommendations', (req, res) => {
console.log("recommendations called");
const { userId } = req.query;
// Placeholder: return all for now
res.json(mockProducts);
});

app.get('/product/:id', (req, res) => {
    const prod = mockProducts.find(p => p.id == req.params.id);
    if (prod) {
      res.json({ ...prod, description: "This is a detailed product description." });
    } else {
      res.status(404).send("Product not found");
    }
  });

  app.get('/search', (req, res) => {
    console.log("search called");
    const { q } = req.query;
    const results = mockProducts.filter(p =>
      p.name.toLowerCase().includes(q.toLowerCase())
    );
    res.json(results);
  });

  let userViews = {
    1: [mockProducts[0], mockProducts[2]]  // example user views
  };
  
  app.get('/history', (req, res) => {
    const { userId } = req.query;
    res.json(userViews[userId] || []);
  });

  let feedbacks = [];

app.post('/feedback', (req, res) => {
  const { userId, productId, rating, comment } = req.body;
  feedbacks.push({ userId, productId, rating, comment });
  res.send("Feedback received");
});

app.post('/login', (req, res) => {
  console.log("login called")

  const { email, password } = req.body;
  // Placeholder user check
  if (email === 'user@example.com' && password === '1234') {
    res.json({ user: { id: 1, email, name: "Sample User" } });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

app.listen(8080, () => console.log("Server running on port 8080"));
