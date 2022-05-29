//########################   Message Docs  ####################################

/**
 * @swagger
 * /api/v1/message/create/{roomId}:
 *   post:
 *     tags:
 *       - Message
 *     name: create
 *     summary: Create Message
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: roomId
 *         in: path
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *               required: true
 *             scopeCategoryId:
 *               type: integer
 *               required: true
 *             subjectCategoryId:
 *               type: integer
 *               required: true
 *         required:
 *           - message
 *           - scopeCategoryId
 *           - subjectCategoryId
 *     responses:
 *       '200':
 *         description: Create Message in successfully
 */

/**
 * @swagger
 * /api/v1/message/getOne/{id}:
 *   get:
 *     tags:
 *       - Message
 *     name: Get one Message
 *     summary: Get one Message
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *     responses:
 *       '200':
 *         description: Success
 *
 */

/**
 * @swagger
 * /api/v1/message/getByRoom/{roomId}:
 *   get:
 *     tags:
 *       - Message
 *     name: Get Message list by Room
 *     summary: Get Message list by Room
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: roomId
 *         in: path
 *     responses:
 *       '200':
 *         description: Success
 *
 */
