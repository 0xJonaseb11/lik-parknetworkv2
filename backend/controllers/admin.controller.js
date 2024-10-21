const {
  getMessage,
  validateAddressWithSignature,
  signUser,
  isAdminAddress,
  getWarningObject,
  updateWarningObject,
  getMaintenanceObject,
  updateMaintenanceObject,
  generateOpenApiKey,
  getAllKeys,
  setInactiveApiKey,
  deleteKey,
} = require('../services/admin.service');
const { formatResponse } = require('../utils/formatResponse');

async function getMessageByWallet(req, res) {
  try {
    const { wallet_address } = req.body;
    if (!wallet_address) {
      throw new Error('wallet_address is required');
    }
    const sign_message = await getMessage({ wallet_address });
    if (sign_message === '') return formatResponse(res, { message: 'Invalid admin wallet address' }, 401);
    else return formatResponse(res, { sign_message });
  } catch (error) {
    return formatResponse(res, { message: 'Internal server error' }, 500);
  }
}

async function signInWithSignature(req, res) {
  try {
    const { wallet_address, signature } = req.body;
    if (!wallet_address || !signature) {
      throw new Error('wallet_address is required');
    }
    const [user, isValidAddress] = await validateAddressWithSignature(signature, wallet_address);
    if (!isValidAddress) {
      throw new Error('Not valid message/signature for wallet address');
    }
    const jwt_token = signUser(user);

    formatResponse(res, { jwt_token });
  } catch (error) {
    formatResponse(res, { message: 'Internal server error' }, 500);
  }
}

async function checkIsAdmin(req, res) {
  try {
    const { wallet_address } = req.body;
    if (!wallet_address) {
      throw new Error('wallet_address is required');
    }
    const isAdmin = await isAdminAddress(wallet_address);
    formatResponse(res, { isAdmin });
  } catch (error) {
    formatResponse(res, { message: 'Internal server error' }, 500);
  }
}

async function getWarningStatus(req, res) {
  try {
    const responseObj = await getWarningObject();
    formatResponse(res, responseObj);
  } catch (error) {
    formatResponse(res, { message: 'Internal server error' }, 500);
  }
}

async function updateWarningStatus(req, res) {
  try {
    const updateRes = await updateWarningObject(req.body);
    if (!updateRes) formatResponse(res, { message: 'Internal server error' }, 500);
    else formatResponse(res, { message: 'Success' });
  } catch (error) {
    formatResponse(res, { message: 'Internal server error' }, 500);
  }
}

async function getMaintenanceMode(req, res) {
  try {
    const responseObj = await getMaintenanceObject();
    formatResponse(res, responseObj);
  } catch (error) {
    formatResponse(res, { message: 'Internal server error' }, 500);
  }
}

async function updateMaintenanceMode(req, res) {
  try {
    const updateRes = await updateMaintenanceObject(req.body);
    if (!updateRes) formatResponse(res, { message: 'Internal server error' }, 500);
    else formatResponse(res, { message: 'Success' });
  } catch (error) {
    formatResponse(res, { message: 'Internal server error' }, 500);
  }
}

async function getOpenApiKey(req, res) {
  try {
    const apiKey = await generateOpenApiKey(req.body);
    formatResponse(res, { apiKey });
  } catch (error) {
    console.log(error);
    formatResponse(res, { message: 'Internal server error' }, 500);
  }
}

async function getApiKeys(req, res) {
  try {
    const apiKeys = await getAllKeys();
    formatResponse(res, apiKeys);
  } catch (error) {
    console.log(error);
    formatResponse(res, { message: 'Internal server error' }, 500);
  }
}

async function removeApiKey(req, res) {
  try {
    if (req.query.soft_delete === 'true') {
      await setInactiveApiKey(req.params.key, req.query.active === 'true');
    } else {
      await deleteKey(req.params.key);
    }
    formatResponse(res, true);
  } catch (error) {
    console.log(error);
    formatResponse(res, { message: 'Internal server error' }, 500);
  }
}

module.exports = {
  getMessageByWallet,
  signInWithSignature,
  checkIsAdmin,
  getWarningStatus,
  updateWarningStatus,
  getMaintenanceMode,
  updateMaintenanceMode,
  getOpenApiKey,
  getApiKeys,
  removeApiKey,
};
