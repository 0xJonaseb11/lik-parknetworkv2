const { authMiddleware } = require('../middleware/auth');
let express = require('express');
var router = express.Router();

const adminController = require('../controllers/admin.controller');

/**
 * /egspectre-api/v1/admin/getMessage:
 *   post:
 *     summary: Get a signature by using wallet address
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   $ref: '#/components/schemas/AdminResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *       500:
 *         description: An unexpected error occurred. Please try again later.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred. Please try again later.
 */
router.post('/getMessage', adminController.getMessageByWallet);

/**
 * /egspectre-api/v1/admin/signIn:
 *   post:
 *     summary: Sign In by using wallet address
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminSignIn'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/AdminSignInResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *       500:
 *         description: An unexpected error occurred. Please try again later.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred. Please try again later.
 */
router.post('/signIn', adminController.signInWithSignature);

/**
 * /egspectre-api/v1/admin/isAdmin:
 *   post:
 *     summary: check whether wallet address is admin wallet or not.
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IsAdmin'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/IsAdminResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *       500:
 *         description: An unexpected error occurred. Please try again later.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred. Please try again later.
 */
router.post('/isAdmin', adminController.checkIsAdmin);

/**
 * /egspectre-api/v1/admin/getWarningStatus:
 *   get:
 *     summary: Get warning message to be displayed on egspectre home page.
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/GetWarningStatusResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *       500:
 *         description: An unexpected error occurred. Please try again later.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred. Please try again later.
 */
router.get('/getWarningStatus', adminController.getWarningStatus);

/**
 * /egspectre-api/v1/admin/updateWarningStatus:
 *   post:
 *     summary: Update warning message and it's show/hide status.
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWarningStatus'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/UpdateSuccessResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *       500:
 *         description: An unexpected error occurred. Please try again later.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred. Please try again later.
 */
router.post('/updateWarningStatus', authMiddleware, adminController.updateWarningStatus);

/**
 * @swagger
 * /egspectre-api/v1/admin/getMaintenanceMode:
 *   get:
 *     summary: Get current website maintenance mode status.
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/GetMaintenanceMode'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *       500:
 *         description: An unexpected error occurred. Please try again later.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred. Please try again later.
 */
router.get('/getMaintenanceMode', adminController.getMaintenanceMode);

/**
 * /egspectre-api/v1/admin/updateWarningStatus:
 *   post:
 *     summary: Update warning message and it's show/hide status.
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateWarningStatus'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/UpdateSuccessResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: Bad Request
 *       500:
 *         description: An unexpected error occurred. Please try again later.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred. Please try again later.
 */
router.post('/updateMaintenanceMode', authMiddleware, adminController.updateMaintenanceMode);

router.post('/open-api-key', adminController.getOpenApiKey);
router.get('/api-keys', adminController.getApiKeys);
router.delete('/api-keys/:key', adminController.removeApiKey);

module.exports = router;
