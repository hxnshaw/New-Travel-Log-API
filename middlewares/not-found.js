const notFound = (res, req) => res.status(404).send("Route Does Not Exist.");

module.exports = notFound;
