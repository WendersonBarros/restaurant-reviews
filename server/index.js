require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const database = require("./infra/database");
const app = express();
const PORT = 3000;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());


// Get all Restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await database.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;"
    )

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows,
      }
    })
  } catch (error) {
    console.error(error);
  }
})

// Get a Restaurant by its ID
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await database.query({
      text: "SELECT * FROM restaurants WHERE id = $1;",
      values: [id]
    });

    const reviews = await database.query({
      text: "SELECT * FROM reviews WHERE restaurant_id = $1;",
      values: [id]
    })

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows
      }
    })
  } catch (error) {
    console.error(error);
  }
})

// Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const results = await database.query({
      text: "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *;",
      values: [name, location, price_range]
    });

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      }
    })
  } catch (error) {
    console.error(error)
  }
})

// Create reviews
app.post("/api/v1/restaurants/:id/review", async (req, res) => {
  try {
    const id = req.params.id;
    const {name, review, rating} = req.body;
    const result = await database.query({
      text: "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;",
      values: [id, name, review, rating]
    })

    res.status(201).json({
      status: "success",
      data: {
        review: result.rows[0]
      }
    })
  } catch (error) {
    console.error(error);
  }
})

// Update Restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, location, price_range } = req.body;
    const results = await database.query({
      text: "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *;",
      values: [name, location, price_range, id]
    })

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      }
    })
  } catch (error) {
    console.error(error)
  }
})

// Delete Restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await database.query({
      text: "DELETE FROM restaurants WHERE id = $1;",
      values: [id]
    })

    res.status(204).json({
      status: "success"
    });
  } catch (error) {
    console.error(error);
  }

})

const port = PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
