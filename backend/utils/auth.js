const getAuthorizationHeader = (req) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    throw new Error('Missing authorization header');
  }

  const authorizationArray = authorization.split(' ');

  if (authorizationArray.length !== 2) {
    throw new Error('Malformed authorization header');
  }

  if (authorizationArray[0] !== 'Bearer') {
    throw new Error('Malformed authorization header');
  }

  return authorizationArray[1];
};

const getApiKeyHeader = (req) => {
  const authorization = req.headers['x-api-key'];

  if (!authorization) {
    throw new Error('Missing x-api-key header');
  }

  return authorization;
};

module.exports = { getAuthorizationHeader, getApiKeyHeader };
