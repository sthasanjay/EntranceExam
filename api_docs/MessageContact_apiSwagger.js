//########################  Message Contact Docs  ####################################

/**
 * @swagger
 * /api/v1/messageContact/create:
 *   post:
 *     tags:
 *       - MessageContact
 *     name: create
 *     summary: Create MessageContact
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
 *             messageWithId:
 *               type: integer
 *               required: false
 *         required:
 *     responses:
 *       '200':
 *         description: Create Discussion in successfully
 */

/**
 * @swagger
 * /api/v1/messageContact/getByUser:
 *   get:
 *     tags:
 *       - MessageContact
 *     name: Get one MessageContact
 *     summary: Get one MessageContact
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Success
 *
 */
