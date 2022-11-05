const pagination = (totalDocs, page, limit) => {
  /*   const page = parseInt(currPage || "1");
  const limit = parseInt(currLimit || "5"); */
  console.log("turors length " + totalDocs);
  // console.log("page is  " + page);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {
    totalDocs: totalDocs,
    totalPages: Math.ceil(totalDocs / limit),
    limit: limit,
    currentPage: page,
  };

  if (endIndex < totalDocs) {
    results.nextPage = page + 1;
  } else {
    results.nextPage = null;
  }

  if (startIndex > 0) {
    results.previousPage = page - 1;
  } else {
    results.previousPage = null;
  }
  return results;
  /* try {
      results.results = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    } */
};

module.exports = pagination;
