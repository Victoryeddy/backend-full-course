import {Products} from "./src/models/Products.js";

export async function seed() {
  try {
    await Products.deleteMany();

    await Products.insertMany([
      {
        name: "Wireless Headphones",
        category: "Electronics",
        price: 59.99,
        inStock: true,
        tags: ["audio", "bluetooth", "gadgets"],
      },
      {
        name: "Running Shoes",
        category: "Fashion",
        price: 89.5,
        inStock: false,
        tags: ["sports", "fitness", "footwear"],
      },
      {
        name: "Stainless Steel Water Bottle",
        category: "Home & Kitchen",
        price: 15.0,
        inStock: false,
        tags: ["eco-friendly", "hydration", "outdoor"],
      },
      {
        name: "LED Desk Lamp",
        category: "Office",
        price: 24.99,
        inStock: true,
        tags: ["lighting", "workspace", "energy-saving"],
      },
      {
        name: "Gaming Mouse",
        category: "Electronics",
        price: 34.75,
        inStock: true,
        tags: ["gaming", "computer", "peripherals"],
      },
      {
        name: "Yoga Mat",
        category: "Fitness",
        price: 22.3,
        inStock: true,
        tags: ["exercise", "health", "workout"],
      },
    ]);

    console.log("Products seeded successfully!");
   
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

