const orderSchema = {
  type: 'object',
  properties: {
    orderId: {
      type: 'string',
      description: 'The unique identifier for the order.',
      example: '644e4670e3fb05c09baa976f',
    },
    from_symbol: {
      type: 'string',
      description: 'The symbol of Token A.',
      example: 'ETH',
    },
    from_amount: {
      type: 'string',
      description: 'The amount of Token A.',
      example: '1.5',
    },
    to_symbol: {
      type: 'string',
      description: 'The symbol of Token B.',
      example: 'BNB',
    },
    to_amount: {
      type: 'string',
      description: 'The amount of Token B.',
      example: '8.65850474',
    },
    to_address: {
      type: 'string',
      description: 'The receiver address of the order.',
      example: '0xCED6A14D3955F3A0579D398Ac87140D6B7D5ad37',
    },
    paying_address: {
      type: 'string',
      description: 'The payin address of the order.',
      example: '0x3A5414FA1a1d2b770Ff9d693a38DFc376deDadC8',
    },
    creation_time: {
      type: 'number',
      description: 'The time that order created.',
      example: 1682851437,
    },
    status: {
      type: 'number',
      description: 'The status of the order.',
      example: 0,
    },
    first_tx_receivedTime: {
      type: 'number',
      description: 'The time that deposit was received from sender.',
      example: 0,
    },
  },
};

const adminOrderSchema = {
  type: 'object',
  properties: {
    orderId: {
      type: 'string',
      description: 'The unique identifier for the order.',
      example: '653aae69a5395b5aa4fe37fa',
    },
    from_symbol: {
      type: 'string',
      description: 'The symbol of Token A.',
      example: 'ETH',
    },
    from_amount: {
      type: 'string',
      description: 'The amount of Token A.',
      example: '1.5',
    },
    to_symbol: {
      type: 'string',
      description: 'The symbol of Token B.',
      example: 'BNB',
    },
    to_amount: {
      type: 'string',
      description: 'The amount of Token B.',
      example: '8.65850474',
    },
    to_address: {
      type: 'string',
      description: 'The receiver address of the order.',
      example: '0xCED6A14D3955F3A0579D398Ac87140D6B7D5ad37',
    },
    paying_address: {
      type: 'string',
      description: 'The payin address of the order.',
      example: '0x3A5414FA1a1d2b770Ff9d693a38DFc376deDadC8',
    },
    creation_time: {
      type: 'number',
      description: 'The time that order created.',
      example: 1682851437,
    },
    status: {
      type: 'number',
      description: 'The status of the order.',
      example: 0,
    },
    inStatus: {
      type: 'number',
      description: 'The status of the start platform order.',
      example: 0,
    },
    outStatus: {
      type: 'number',
      description: 'The status of the end platform order.',
      example: 0,
    },
    exchange_flow: {
      type: 'string',
      description: 'Exchange flow identifier',
      example: 'ss_cn',
    },
    first_tx_receivedTime: {
      type: 'number',
      description: 'The time that deposit was received from sender.',
      example: 0,
    },
  },
};

const newOrderSchema = {
  type: 'object',
  properties: {
    from_amount: {
      type: 'string',
      description: 'The amount of Token A.',
      example: '1.5',
    },
    to_address: {
      type: 'string',
      description: 'The Receipt address of Token B.',
      example: '0xCED6A14D3955F3A0579D398Ac87140D6B7D5ad37',
    },
    from_symbol: {
      type: 'string',
      description: 'The symbol of Token A.',
      example: 'ETH',
    },
    to_symbol: {
      type: 'string',
      description: 'The symbol of Token B.',
      example: 'BNB',
    },
    is_anon: {
      type: 'string',
      description: 'If true the quote will be anonymous if false it will be discreet',
      example: 'true | false',
    },
  },
  required: ['from_amount', 'to_address', 'from_symbol', 'to_symbol'],
};

const newOrderResponseSchema = {
  type: 'object',
  properties: {
    egSpectreId: {
      type: 'string',
      description: 'The unique identifier for the order.',
      example: '644fa425cd8ed5851bd10174',
    },
  },
};

module.exports = {
  orderSchema,
  adminOrderSchema,
  newOrderSchema,
  newOrderResponseSchema,
};
