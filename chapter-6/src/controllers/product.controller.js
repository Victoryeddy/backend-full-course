import { Products } from "../models/Products.js";
import { handleError } from "../utils/handleError.js";

export const getProductStats = async (req, res) => {
  try {
    // Example of using aggregator pipeline
    const result = await Products.aggregate([
      {
        $match: {
          // inStock: fa,
          price: {
            $gte: 50,
          },
        },
      },
      {
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    handleError(error, res);
  }
};
