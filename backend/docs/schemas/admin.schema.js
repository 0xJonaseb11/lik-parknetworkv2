const adminSchema = {
  type: "object",
  properties: {
    wallet_address: {
      type: "string",
      description: "Admin wallet address.",
      example: "0xEf80a1fF79751CE99A07043C2b2029Aab79E620d",
    },
  },
};

const adminSignInSchema = {
  type: "object",
  properties: {
    wallet_address: {
      type: "string",
      description: "Admin wallet address.",
      example: "0xEf80a1fF79751CE99A07043C2b2029Aab79E620d",
    },
    signature: {
      type: "string",
      description: "Signature generated from the admin wallet address",
      example:
        "0x7561b87e0b22439f1a9cd56626a82ffc035f61a410b861ad62e60aa7b6cb0edf2e57a8b7ad65691f6ed17bf717810fa949c8a5139ac7107be833c5bcafda20d31b",
    },
  },
};

const adminResponseSchema = {
  type: "object",
  properties: {
    signature: {
      type: "string",
      description: "The signature that indicates admin wallet address.",
      example:
        "qweqwe098qwe098qwe098qwe9786qwe876qwe876qwe876qw8e76q8w7e6qw8e76",
    },
  },
};

const adminSignInResponseSchema = {
  type: "object",
  properties: {
    auth_token: {
      type: "string",
      description:
        "The authentication token that indicates admin wallet address.",
      example:
        "qweqwe098qwe098qwe098qwe9786qwe876qwe876qwe876qw8e76q8w7e6qw8e76",
    },
  },
};

const isAdminSchema = {
  type: "object",
  properties: {
    wallet_address: {
      type: "string",
      description: "Admin wallet address.",
      example: "0xEf80a1fF79751CE99A07043C2b2029Aab79E620d",
    },
  },
};

const isAdminResponseSchema = {
  type: "object",
  properties: {
    isAdmin: {
      type: "boolean",
      description: "Whether it's an admin or not.",
      example: true,
    },
  },
};

const getWarningStatusResponseSchema = {
  type: "object",
  properties: {
    warning_status: {
      type: "boolean",
      description: "Show warning message to users or not",
      example: true,
    },
    message: {
      type: "string",
      description: "Message to show users",
      example: "USDT(ERC-20) is under maintenance",
    },
  },
};

const updateWarningStatusSchema = {
  type: "object",
  properties: {
    warning_status: {
      type: "boolean",
      description: "Show warning message to users or not",
      example: true,
    },
    message: {
      type: "string",
      description: "Message to show users",
      example: "USDT(ERC-20) is under maintenance",
    },
  },
};

const updateSuccessResponseSchema = {
  type: "object",
  properties: {
    message: {
      type: "string",
      description: "Update success message",
      example: "Success",
    },
  },
};

const getMaintenanceModeSchema = {
  type: "object",
  properties: {
    maintenance_status: {
      type: "boolean",
      description: "Website maintenance mode status",
      example: true,
    },
  },
};

module.exports = {
  adminSchema,
  adminResponseSchema,
  adminSignInSchema,
  adminSignInResponseSchema,
  isAdminSchema,
  isAdminResponseSchema,
  getWarningStatusResponseSchema,
  updateWarningStatusSchema,
  updateSuccessResponseSchema,
  getMaintenanceModeSchema
};
