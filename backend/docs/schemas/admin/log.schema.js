const logSchema = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      description: "The unique identifier for the log."
    },
    method: {
      type: "string",
      description: "The method of the request."
    },
    url: {
      type: "string",
      description: "The url of the request."
    },
    params: {
      type: "string",
      description: "The params of the request."
    },
    deviceInfo: {
      type: "object",
      description: "The device info of the request."
    },
    timestamp: {
      type: "date",
      description: "The timestamp of the request."
    }
  }
}

module.exports = {
  logSchema,
}