//########################   User Docs  ####################################

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - User
 *     name: Get all Customer
 *     summary: Get all Customer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success
 */

/**
 * @swagger
 * /api/v1/users/updateRole/{id}:
 *   patch:
 *     tags:
 *       - User
 *     name: Update User role
 *     summary: Update User role
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             role:
 *               type: string
 *         required:
 *           - role
 *     responses:
 *       '200':
 *         description: Success
 *
 */

/**
 * @swagger
 * /api/v1/users/updateProfile/{id}:
 *   patch:
 *     tags:
 *       - User
 *     name: Update User Profile (GeneralInfo)
 *     summary: Update User Profile (GeneralInfo)
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             phoneNumber:
 *               type: string
 *     responses:
 *       '200':
 *         description: Success
 *
 */
