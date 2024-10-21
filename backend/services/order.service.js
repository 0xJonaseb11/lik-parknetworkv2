//** Order Model */
const Order = require("../models/order.model");

/**
 * Retrieves a list of orders based on a given query and sort order.
 *
 * @async
 * @function getOrderList
 * @param {object} query - The query object used to filter the orders.
 * @param {string} sortBy - The sort order of the orders ('asc' for ascending or 'desc' for descending).
 * @returns {Promise<Array<object>|null>} An array of orders matching the query and sort order, or null if there was an error.
 * @throws {Error} If there is an error retrieving the orders.
 */
async function getOrderList(query, sortBy) {
  try {
    const sortOptions = {};
    if (sortBy === "asc") {
      sortOptions._id = 1;
    } else if (sortBy === "desc") {
      sortOptions._id = -1;
    }

    const orders = await Order.find(query).sort(sortOptions);
    return orders;
  } catch (error) {
    console.error(`Error getting orders: ${error}`);
    return null;
  }
}

/**
 * Finds a single order that matches the given query
 *
 * @async
 * @function getOrderOne
 * @param {Object} query - The query used to find the order
 * @returns {Object|null} - The found order object or null if not found
 */
async function getOrderOne(query) {
  console.log("query: ", JSON.stringify(query));
  try {
    const order = await Order.findOne(query);
    return order || null;
  } catch (error) {
    console.error(`Error getting order: ${error}`);
    return null;
  }
}

/**
 * Creates a new order and returns the saved order data.
 *
 * @async
 * @function createOrderOne
 * @param {Object} orderData - The data of the order to be created.
 * @returns {Promise<Object>} - The saved order data, or null if an error occurred.
 */
async function createOrderOne(orderData) {
  try {
    const order = new Order(orderData);
    const savedOrder = await order.save();
    return savedOrder;
  } catch (error) {
    console.error(`Error creating order: ${error}`);
    return null;
  }
}

/**
 * Update a single order in the database.
 *
 * @async
 * @function updateOrderOne
 * @param {string} id - The ID of the order to update.
 * @param {Object} orderData - The data to update the order with.
 * @returns {Promise<Object|null>} - Returns a Promise that resolves to the updated order data or null if an error occurs.
 */
async function updateOrderOne(id, orderData) {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, orderData, {
      new: true,
    });
    return updatedOrder;
  } catch (error) {
    console.error(`Error updating order: ${error}`);
    return null;
  }
}

module.exports = {
  getOrderList,
  getOrderOne,
  createOrderOne,
  updateOrderOne,
};
