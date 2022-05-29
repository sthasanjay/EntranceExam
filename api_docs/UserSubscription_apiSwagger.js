/**
 * @swagger
 * /api/v1/userSubscription/checkSubscription:
 *   post:
 *     tags:
 *       - User Subscription
 *     name: Check User Subscription
 *     summary: Check User Subscription
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             scopeCategoryId:
 *               type: string
 *               required: true
 *         required:
 *           - scopeCategoryId
 *     responses:
 *       '200':
 *         description:Check User Subscription successful
 */




