function formatResponse(res, data, code = 200) {
  return res.json({
    code: code || 200,
    data,
  });
}

function sendResponse(res, message, code = 200, extraData) {
  return res.status(code).json({
    code,
    message,
    ...(extraData ? { data: extraData } : {}),
  });
}

module.exports = { formatResponse, sendResponse };
