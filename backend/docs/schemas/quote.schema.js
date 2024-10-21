const quoteSchema = {
  type: 'object',
  properties: {
    from_amount: {
      type: 'string',
      description: 'The amount of token A.',
    },
    from_symbol: {
      type: 'string',
      description: 'The token A symbol.',
    },
    to_symbol: {
      type: 'string',
      description: 'The token B symbol.',
    },
    is_anon: {
      type: 'string',
      description: 'If true the quote will be anonymous if false it will be discreet',
      example: 'true | false',
    },
  },
};

const quoteresponseSchema = {
  type: 'object',
  properties: {
    fromAmount: {
      type: 'string',
      description: 'The amount of token A.',
    },
    toAmount: {
      type: 'string',
      description: 'The amount of token B.',
    },
    minAmount: {
      type: 'string',
      description: 'The min amount for token exchange.',
    },
    maxAmount: {
      type: 'string',
      description: 'The max amount for token exchange.',
    },
  },
};

const categorySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'The unique identifier for the category.',
    },
    name: {
      type: 'string',
      description: 'The name of the category.',
    },
  },
};

const networkSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'The unique identifier for the network.',
    },
    logo: {
      type: 'string',
      description: 'The logo of the network.',
    },
    name: {
      type: 'string',
      description: 'The name of the network.',
    },
  },
};

const tokenSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'The unique identifier for the token.',
    },
    logo: {
      type: 'string',
      description: 'The logo of the token.',
    },
    name: {
      type: 'string',
      description: 'The name of the token.',
    },
    color: {
      type: 'string',
      description: 'The color of the token.',
    },
    keyword: {
      type: 'string',
      description: 'The keyword of the token.',
    },
    displayName: {
      type: 'string',
      description: 'The display name of the token.',
    },
    categoryId: {
      type: 'string',
      description: 'The unique identifier for the category.',
    },
    networkId: {
      type: 'string',
      description: 'The unique identifier for the network.',
    },
  },
};

const chartSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      description: 'The name of the token',
    },
    symbol: {
      type: 'string',
      description: 'The symbol of the token',
    },
    image: {
      type: 'string',
      description: 'The image of the token',
    },
    current_price: {
      type: 'string',
      description: 'The current price of the token',
    },
    price_change_percentage_24h: {
      type: 'string',
      description: 'The price change percentage in 24h of the token.',
    },
    sparkline_in_7d: {
      type: 'array',
      description: 'The sparkline in 7d of the token.',
      example: [{}],
    },
  },
};

module.exports = {
  quoteSchema,
  quoteresponseSchema,
  categorySchema,
  networkSchema,
  tokenSchema,
  chartSchema,
};
