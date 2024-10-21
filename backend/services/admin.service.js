//** Admin Model */
const Admin = require('../models/admin.model');
const WarningStatus = require('../models/warningStatus.model');
const MaintenanceMode = require('../models/maintenanceMode.model');
const { bufferToHex } = require('ethereumjs-util');
const uuid4 = require('uuid4');
const jwt = require('jsonwebtoken');
const { recoverPersonalSignature } = require('@metamask/eth-sig-util');
const ApiKey = require('../models/apiKey.model');
const ApiKeyLog = require('../models/apiKeyLog.model');
const Order = require('../models/order.model');

/**
 * Generate a signature based on the admin wallet address
 *
 * @async
 * @function getMessage
 * @param {object} query - The query object used to search admin wallet.
 * @returns {object} Returns the signature
 * @throws {Error} If there is an error return empty string as signature.
 */
async function getMessage(query) {
  try {
    const adminWallet = await Admin.findOne(query);
    if (!adminWallet) return '';
    else {
      const uuid4Msg = uuid4();
      const currentMessage = 'Sign message';
      const sign_message = currentMessage + ' ' + uuid4Msg;
      const doc = await Admin.findOneAndUpdate(query, { sign_message }, { new: true });
      return doc.sign_message;
    }
  } catch (error) {
    console.error(`Error getting signature: ${error}`);
    return '';
  }
}

async function validateAddressWithSignature(signature, wallet_address) {
  const existingAdminWallet = await Admin.findOne({ wallet_address });

  if (!existingAdminWallet) {
    return [null, false];
  }

  const address = getAddressFromSignature(existingAdminWallet.sign_message, signature);
  if (address && address === wallet_address.toLowerCase()) {
    return [existingAdminWallet, true];
  }

  return [null, false];
}

function getAddressFromSignature(sign_message, signature) {
  try {
    const messageHex = bufferToHex(Buffer.from(sign_message, 'utf8'));
    const address = recoverPersonalSignature({
      data: messageHex,
      signature,
    });

    return address.toLowerCase();
  } catch (error) {
    return '';
  }
}

function signUser(user) {
  const payload = {
    wallet_address: user.wallet_address,
    role: 'admin',
    sign_message: user.sign_message,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION_TIME,
  });
}

async function isAdminAddress(wallet_address) {
  const existingAdminWallet = await Admin.findOne({ wallet_address });
  if (!existingAdminWallet) return false;
  else return true;
}

async function getWarningObject() {
  const warningObj = await WarningStatus.findOne();
  return warningObj;
}

async function updateWarningObject(obj) {
  try {
    const warningArr = await WarningStatus.find();
    const id = warningArr[0]._id;
    const updateRes = await WarningStatus.findByIdAndUpdate(id, obj);
    if (!updateRes) return false;
    return true;
  } catch (error) {
    return false;
  }
}

async function getMaintenanceObject() {
  const maintenanceObj = await MaintenanceMode.findOne();
  return maintenanceObj;
}

async function updateMaintenanceObject(obj) {
  try {
    const maintenanceObjArr = await MaintenanceMode.find();
    const id = maintenanceObjArr[0]._id;
    const updateRes = await MaintenanceMode.findByIdAndUpdate(id, obj);
    if (!updateRes) return false;
    return true;
  } catch (error) {
    return false;
  }
}

async function generateOpenApiKey(payload) {
  const data = {
    key: uuid4(),
    active: true,
    company: payload.company || '',
    expiredAt: payload.expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * Number(process.env.API_KEY_EXPIRED_DAYS)),
  };
  const openApiKey = new ApiKey(data);
  const savedKey = await openApiKey.save();
  return savedKey;
}

async function getAllKeys() {
  const cachedOrders = {};
  const savedKeys = await ApiKey.find();
  const allKeys = [];
  for (const savedKey of savedKeys) {
    const logs = await ApiKeyLog.find({
      apiKey: savedKey._id,
      url: { $regex: '/api/v1/orders', $options: 'i' },
    }).sort({ createdAt: 'desc' });
    const allLogs = [];
    for (const log of logs) {
      // There is an order created, pull the latest status
      if (log?.response?._id) {
        if (!cachedOrders[log.response._id]) {
          const order = await Order.findById(log.response._id);
          if (order) {
            cachedOrders[order._id] = order;
            allLogs.push({ ...log.toObject(), order });
          }
        }
      } else {
        console.log(log.response);
        allLogs.push({ ...log.toObject() });
      }
    }
    allKeys.push({ ...savedKey.toObject(), logs: allLogs });
  }

  const websiteOrders = await Order.find({ source: 'wepark' }).sort({ creation_time: 'desc' });

  allKeys.push({
    key: 'xxx-xxx-xxx',
    company: 'WeParknetwork',
    active: true,
    name: 'WeParknetwork',
    expiredAt: '2030-01-01',
    createdAt: '2022-01-01',
    logs: websiteOrders.map((e) => {
      console.log({ l: Number(e.creation_time), y: Number(e.creation_time) * 1000, x: new Date(Number(e.creation_time) * 1000) });
      return { order: e, createdAt: new Date(Number(e.creation_time) * 1000), method: 'POST', action: 'POST', url: `/api/v1/orders` };
    }),
  });

  return allKeys;
}

async function setInactiveApiKey(key, active) {
  const existingKey = await ApiKey.findOne({ key });

  if (!existingKey) {
    throw new Error('Key does not exist');
  }

  existingKey.active = active;
  await existingKey.save();
  return true;
}

async function deleteKey(key) {
  const existingKey = await ApiKey.findOne({ key });

  if (!existingKey) {
    throw new Error('Key does not exist');
  }

  await existingKey.deleteOne();
  return true;
}

async function registerCall(apiKey, payload, response, url, action) {
  try {
    if (!apiKey) {
      console.log('There is not api key, in registerCall');
      return;
    }

    const existingKey = await ApiKey.findOne({ key: apiKey });
    if (!existingKey) {
      console.log('There is not api key in Mongo, in registerCall');
      return;
    }

    const log = new ApiKeyLog({ apiKey: existingKey._id, payload, response, url, action, createdAt: new Date() });
    await log.save();

    return;
  } catch (error) {
    console.log('Error while registering call', error);
  }
}

module.exports = {
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
  registerCall,
  deleteKey,
};
