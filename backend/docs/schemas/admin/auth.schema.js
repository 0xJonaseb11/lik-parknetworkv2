const authAdminSchema = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      description: "The unique identifier for the admin."
    },
    email: {
      type: "string",
      description: "The email of the admin."
    },
    accessToken: {
      type: "string",
      description: "The access token for the admin."
    },
    refreshToken: {
      type: "string",
      description: "The refresh token for the admin."
    }
  }
}

const signInAdminSchema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      description: "The email of the admin."
    },
    password: {
      type: "string",
      description: "The password of the admin."
    }
  },
  required: ["email", "password"]
}

const refreshTokenAdminSchema = {
  type: "object",
  properties: {
    refreshToken: {
      type: "string",
      description: "The refresh token to get access token for the admin."
    }
  },
  required: ["refreshToken"]
}

module.exports = {
  authAdminSchema,
  signInAdminSchema,
  refreshTokenAdminSchema
}