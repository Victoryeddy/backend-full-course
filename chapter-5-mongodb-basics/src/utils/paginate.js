/**
 * Handles pagination for Mongoose models with optional filters, search, and sorting.
 * @param {Object} model - Mongoose model
 * @param {Object} req - Express request object
 * @param {Object} [options] - Optional configuration
 * @param {Object} [options.filter={}] - Additional MongoDB filter
 * @param {Object} [options.searchFields=[]] - Fields to search by query param 'q'
 * @param {Object} [options.defaultSort={ createdAt: -1 }] - Default sort order
 * @returns {Object} - Paginated result
 */
export const paginate = async (model, req, options = {}, type = '') => {
  const {
    filter = {},
    searchFields = [],
    defaultSort = { createdAt: -1 },
  } = options;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const searchQuery = req.query.q;
  let searchFilter = {};
  if (searchQuery && searchFields.length > 0) {
    searchFilter = {
      $or: searchFields.map((field) => ({
        [field]: { $regex: searchQuery, $options: "i" },
      })),
    };
  }

  const finalFilter = { ...filter, ...searchFilter };

  let sort = defaultSort;
  if (req.query.sortBy) {
    const order = req.query.order === "asc" ? 1 : -1;
    sort = { [req.query.sortBy]: order };
  }

  const total = await model.countDocuments(finalFilter);

  const data = await model.find(finalFilter).sort(sort).skip(skip).limit(limit);

  // Base URL for prev/next links
  const baseUrl = `${req.protocol}://${req.get("host")}${req.path}`;
  const totalPages = Math.ceil(total / limit);

  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  const prevUrl = prevPage
    ? `${baseUrl}?page=${prevPage}&limit=${limit}`
    : null;
  const nextUrl = nextPage
    ? `${baseUrl}?page=${nextPage}&limit=${limit}`
    : null;

  return {
    total,
    page,
    totalPages,
    limit,
    prevUrl,
    nextUrl,
    data,
    message: `${type} Retrieved Successfully`,
    success: true
  };
};
