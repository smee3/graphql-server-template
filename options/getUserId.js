const jwt = require('jsonwebtoken');

const getUserId = (request, requireAuth = true) => {
  const header = request.req?.headers?.authorization || '';
  if (header) {
    const token = header.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return parseInt(decodedToken, 10);
  }

  if (requireAuth) {
    throw new Error('Authentication required.');
  }

  return null;
}

module.exports = {
  getUserId,
}
