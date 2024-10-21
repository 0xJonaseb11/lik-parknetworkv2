const { orderSchema, adminOrderSchema, newOrderSchema, newOrderResponseSchema } = require('./schemas/order.schema');
const { quoteSchema, quoteresponseSchema, categorySchema, networkSchema, tokenSchema } = require('./schemas/quote.schema');
const {
  adminSchema,
  adminSignInSchema,
  adminResponseSchema,
  adminSignInResponseSchema,
  isAdminSchema,
  isAdminResponseSchema,
  getWarningStatusResponseSchema,
  updateWarningStatusSchema,
  updateSuccessResponseSchema,
  getMaintenanceModeSchema,
} = require('./schemas/admin.schema');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'EGSpectre API Doc',
    version: '1.0.0',
    description: 'The EGSpectre API Documentation.',
  },
  servers: [
    {
      url: 'https://api.weparknetwork.org',
      description: '',
    },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
      },
    },
    schemas: {
      Quote: quoteSchema,
      QuoteResponse: quoteresponseSchema,
      Order: orderSchema,
      Admin: adminSchema,
      AdminResponse: adminResponseSchema,
      AdminSignIn: adminSignInSchema,
      AdminSignInResponse: adminSignInResponseSchema,
      IsAdmin: isAdminSchema,
      IsAdminResponse: isAdminResponseSchema,
      GetWarningStatusResponse: getWarningStatusResponseSchema,
      UpdateWarningStatus: updateWarningStatusSchema,
      UpdateSuccessResponse: updateSuccessResponseSchema,
      GetMaintenanceMode: getMaintenanceModeSchema,
      AdminOrder: adminOrderSchema,
      NewOrder: newOrderSchema,
      NewOrderResponse: newOrderResponseSchema,
      Category: categorySchema,
      Network: networkSchema,
      Token: tokenSchema,
    },
  },
  security: {
    ApiKeyAuth: [],
  },
};

module.exports = swaggerDefinition;
