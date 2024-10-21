//** Models */
const Category = require("../models/category.model");
const Network = require("../models/network.model");
const Token = require("../models/token.model");
// const Chart = require('../models/chart.model');

/** ------------- Category ------------- */

/**
 * Retrieves a list of categories based on a given query and sort order.
 *
 * @async
 * @function getCategoryList
 * @param {object} query - The query object used to filter the categories.
 * @param {string} sortBy - The sort order of the categories ('asc' for ascending or 'desc' for descending).
 * @returns {Promise<Array<object>|null>} An array of categories matching the query and sort order, or null if there was an error.
 * @throws {Error} If there is an error retrieving the categories.
 */
async function getCategoryList(query, sortBy) {
  try {
    const sortOptions = {};
    if (sortBy === 'asc') {
      sortOptions._id = 1;
    } else if (sortBy === 'desc') {
      sortOptions._id = -1;
    }

    const categories = await Category.find(query).sort(sortOptions);
    return categories;
  } catch (error) {
    console.error(`Error getting categories: ${error}`);
    return null;
  }
}

/**
 * Retrieves a single category based on a given query.
 *
 * @async
 * @function getCategoryOne
 * @param {object} query - The query object used to find the category.
 * @returns {Promise<object|null>} The category matching the query or null if it does not exist or there was an error.
 * @throws {Error} If there is an error retrieving the category.
 */
async function getCategoryOne(query) {
  try {
    const category = await Category.findOne(query);
    if (category) return category;
    return null;
  } catch (error) {
    console.error(`Error getting category: ${error}`);
    return null;
  }
}

/**
 * Creates a new category with the given data.
 *
 * @async
 * @function createCategoryOne
 * @param {object} categoryData - The data for the new category.
 * @returns {Promise<object|null>} The newly created category or null if there was an error creating it.
 * @throws {Error} If there is an error creating the category.
 */
async function createCategoryOne(categoryData) {
  try {
    const category = new Category(categoryData);
    const savedCategory = await category.save();
    return savedCategory;
  } catch (error) {
    console.error(`Error creating category: ${error}`);
    return null;
  }
}

/**
 * Updates an existing category with the given ID and data.
 *
 * @async
 * @function updateCategoryOne
 * @param {string} id - The ID of the category to update.
 * @param {object} categoryData - The updated data for the category.
 * @returns {Promise<object|null>} The updated category or null if there was an error updating it.
 * @throws {Error} If there is an error updating the category.
 */
async function updateCategoryOne(id, categoryData) {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, {
      new: true,
    });
    return updatedCategory;
  } catch (error) {
    console.error(`Error updating category: ${error}`);
    return null;
  }
}

/**
 * Deletes a single category based on the given ID and sets its 'isDeleted' flag to true.
 *
 * @async
 * @function deleteCategoryOne
 * @param {object} filter - The filter object used to find and delete the category.
 * @param {string} filter.id - The ID of the category to delete.
 * @param {boolean} filter.isDeleted - The 'isDeleted' flag to set for the category.
 * @returns {Promise<Array<object>|null>} An array of remaining categorys or null if there was an error deleting the category.
 * @throws {Error} If there is an error deleting the category.
 */
async function deleteCategoryOne(filter) {
  try {
    const { id, isDeleted } = filter;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (deletedCategory) {
      const remainingCategories = await Category.find({
        isDeleted: isDeleted,
      }).sort({ _id: -1 });
      return remainingCategories;
    }
    return null;
  } catch (error) {
    console.error(`Error deleting category: ${error}`);
    return null;
  }
}

/** ------------- Network ------------- */

/**
 * Retrieves a list of networks based on a given query and sort order.
 *
 * @async
 * @function getNetworkList
 * @param {object} query - The query object used to filter the networks.
 * @param {string} sortBy - The sort order of the networks ('asc' for ascending or 'desc' for descending).
 * @returns {Promise<Array<object>|null>} An array of networks matching the query and sort order, or null if there was an error.
 * @throws {Error} If there is an error retrieving the networks.
 */
async function getNetworkList(query, sortBy) {
  try {
    const sortOptions = {};
    if (sortBy === "asc") {
      sortOptions._id = 1;
    } else if (sortBy === "desc") {
      sortOptions._id = -1;
    }

    const networks = await Network.find(query).sort(sortOptions);
    return networks;
  } catch (error) {
    console.error(`Error getting networks: ${error}`);
    return null;
  }
}

/**
 * Retrieves a single network based on a given query.
 *
 * @async
 * @function getNetworkOne
 * @param {object} query - The query object used to find the network.
 * @returns {Promise<object|null>} The network matching the query or null if it does not exist or there was an error.
 * @throws {Error} If there is an error retrieving the network.
 */
async function getNetworkOne(query) {
  try {
    const network = await Network.findOne(query);
    if (network) return network;
    return null;
  } catch (error) {
    console.error(`Error getting network: ${error}`);
    return null;
  }
}

/**
 * Creates a new network with the given data.
 *
 * @async
 * @function createNetworkOne
 * @param {object} networkData - The data for the new network.
 * @returns {Promise<object|null>} The newly created network or null if there was an error creating it.
 * @throws {Error} If there is an error creating the network.
 */
async function createNetworkOne(networkData) {
  try {
    const network = new Network(networkData);
    const savedNetwork = await network.save();
    return savedNetwork;
  } catch (error) {
    console.error(`Error creating network: ${error}`);
    return null;
  }
}

/**
 * Updates an existing network with the given ID and data.
 *
 * @async
 * @function updateNetworkOne
 * @param {string} id - The ID of the network to update.
 * @param {object} networkData - The updated data for the network.
 * @returns {Promise<object|null>} The updated network or null if there was an error updating it.
 * @throws {Error} If there is an error updating the network.
 */
async function updateNetworkOne(id, networkData) {
  try {
    const updatedNetwork = await Network.findByIdAndUpdate(id, networkData, {
      new: true,
    });
    return updatedNetwork;
  } catch (error) {
    console.error(`Error updating network: ${error}`);
    return null;
  }
}

/**
 * Deletes a single network based on the given ID and sets its 'isDeleted' flag to true.
 *
 * @async
 * @function deleteNetworkOne
 * @param {object} filter - The filter object used to find and delete the network.
 * @param {string} filter.id - The ID of the network to delete.
 * @param {boolean} filter.isDeleted - The 'isDeleted' flag to set for the network.
 * @returns {Promise<Array<object>|null>} An array of remaining networks or null if there was an error deleting the network.
 * @throws {Error} If there is an error deleting the network.
 */
async function deleteNetworkOne(filter) {
  try {
    const { id, isDeleted } = filter;
    const deletedNetwork = await Network.findByIdAndDelete(id);
    if (deletedNetwork) {
      const remainingNetworks = await Network.find({
        isDeleted: isDeleted,
      }).sort({ _id: -1 });
      return remainingNetworks;
    }
    return null;
  } catch (error) {
    console.error(`Error deleting network: ${error}`);
    return null;
  }
}

/** ------------- Token ------------- */

/**
 * Retrieves a list of tokens based on a given query and sort order.
 *
 * @async
 * @function getTokenList
 * @param {object} query - The query object used to filter the tokens.
 * @param {string} sortBy - The sort order of the tokens ('asc' for ascending or 'desc' for descending).
 * @returns {Promise<Array<object>|null>} An array of tokens matching the query and sort order, or null if there was an error.
 * @throws {Error} If there is an error retrieving the tokens.
 */
async function getTokenList(query, sortOptions = {}) {
  try {
    if (Object.keys(sortOptions).length === 0) {
      sortOptions._id = "asc";
    }
    const tokens = await Token.find(query).populate('networkId').sort(sortOptions);
    return tokens;
  } catch (error) {
    console.error(`Error getting tokens: ${error}`);
    return null;
  }
}

/**
 * Retrieves a single token based on a given query.
 *
 * @async
 * @function getTokenOne
 * @param {object} query - The query object used to find the token.
 * @returns {Promise<object|null>} The token matching the query or null if it does not exist or there was an error.
 * @throws {Error} If there is an error retrieving the token.
 */
async function getTokenOne(query) {
  try {
    const token = await Token.findOne(query);
    if (token) return token;
    return null;
  } catch (error) {
    console.error(`Error getting token: ${error}`);
    return null;
  }
}

/**
 * Creates a new token with the given data.
 *
 * @async
 * @function createTokenOne
 * @param {object} tokenData - The data for the new token.
 * @returns {Promise<object|null>} The newly created token or null if there was an error creating it.
 * @throws {Error} If there is an error creating the token.
 */
async function createTokenOne(tokenData) {
  try {
    const token = new Token(tokenData);
    const savedToken = await token.save();
    return savedToken;
  } catch (error) {
    console.error(`Error creating token: ${error}`);
    return null;
  }
}

/**
 * Updates an existing token with the given ID and data.
 *
 * @async
 * @function updateTokenOne
 * @param {string} id - The ID of the token to update.
 * @param {object} tokenData - The updated data for the token.
 * @returns {Promise<object|null>} The updated token or null if there was an error updating it.
 * @throws {Error} If there is an error updating the token.
 */
async function updateTokenOne(id, tokenData) {
  try {
    const updatedToken = await Token.findByIdAndUpdate(id, tokenData, {
      new: true,
    });
    return updatedToken;
  } catch (error) {
    console.error(`Error updating token: ${error}`);
    return null;
  }
}

/**
 * Deletes a single token based on the given ID and sets its 'isDeleted' flag to true.
 *
 * @async
 * @function deleteTokenOne
 * @param {object} filter - The filter object used to find and delete the token.
 * @param {string} filter.id - The ID of the token to delete.
 * @param {boolean} filter.isDeleted - The 'isDeleted' flag to set for the token.
 * @returns {Promise<Array<object>|null>} An array of remaining tokens or null if there was an error deleting the token.
 * @throws {Error} If there is an error deleting the token.
 */
async function deleteTokenOne(filter) {
  try {
    const { id, isDeleted } = filter;
    const deletedToken = await Token.findByIdAndDelete(id);
    if (deletedToken) {
      const remainingTokens = await Token.find({ isDeleted: isDeleted }).sort({
        _id: -1,
      });
      return remainingTokens;
    }
    return null;
  } catch (error) {
    console.error(`Error deleting token: ${error}`);
    return null;
  }
}

module.exports = {
  getCategoryList,
  getCategoryOne,
  createCategoryOne,
  updateCategoryOne,
  deleteCategoryOne,
  getNetworkList,
  getNetworkOne,
  createNetworkOne,
  updateNetworkOne,
  deleteNetworkOne,
  getTokenList,
  getTokenOne,
  createTokenOne,
  updateTokenOne,
  deleteTokenOne,
};
