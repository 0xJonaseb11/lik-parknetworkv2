const ApiKey = require('../models/apiKey.model');
const { getMaintenanceObject } = require('../services/admin.service');
const { getAuthorizationHeader, getApiKeyHeader } = require('../utils/auth');
const jwt = require('jsonwebtoken');

const allowedOrigins = ['https://api.weparknetwork.org', 'https://api.weparknetwork.org/', 'https://api.weparknetwork.org'];
async function authMiddleware(req, res, next) {
  try {
    const token = getAuthorizationHeader(req);

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { wallet_address } = payload;

    if (!payload || !wallet_address) {
      throw new Error('User not authorized or not exist');
    }
    next();
  } catch (error) {
    throw new Error('Token expired/invalid');
  }
}

async function authKeyMiddleware(req, res, next) {
  try {
    next();
    return;
    if (allowedOrigins.includes(req.headers.origin) || allowedOrigins.includes(req.headers.referer)) {
      next();
      return;
    }

    const token = getApiKeyHeader(req);

    const apiKey = await ApiKey.findOne({ key: token });

    if (!apiKey) {
      throw new Error('Not Authorized');
    }

    if (!apiKey.active) {
      throw new Error('Token is not active');
    }

    if (apiKey.expiredAt < new Date()) {
      apiKey.active = false;
      await apiKey.save();
      throw new Error('Token is expired');
    }

    const maintenanceMode = await getMaintenanceObject();
    if (maintenanceMode?.maintenance_status && req.method === 'POST') {
      throw new Error('Maintenance mode is ON');
    }

    req.apiKey = apiKey.key;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: error.message });
  }
}

module.exports = { authMiddleware, authKeyMiddleware };
