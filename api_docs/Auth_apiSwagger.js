//########################   Auth Docs  ####################################
/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     tags:
 *       - Auth
 *     name: signup
 *     summary: Sign in a new user in Entrance Exam
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             firstName:
 *               type: string
 *               required: true
 *             lastName:
 *               type: string
 *               required: true
 *             email:
 *               type: string
 *               required: true
 *             phoneNumber:
 *               type: string
 *               required: true
 *             role:
 *               type: string
 *               required: true
 *             password:
 *               type: string
 *               format: password
 *               required: true
 *             passwordConfirm:
 *               type: string
 *               format: password
 *               required: true
 *         required:
 *           - firstName
 *           - lastName
 *           - email
 *           - phoneNumber
 *           - role
 *           - password
 *           - passwordConfirm
 *     responses:
 *       '200':
 *         description: User created in successfully
 */

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     tags:
 *       - Auth
 *     name: Login
 *     summary: Logs in a user providing jason web token
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             email:
 *               type: string
 *               required: true
 *             password:
 *               type: string
 *               format: password
 *               required: true
 *         required:
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: User found and logged in successfully
 *       '401':
 *         description: Bad username, not found in db
 *       '403':
 *         description: Username and password don't match
 */

/**
 * @swagger
 * /api/v1/users/forgotPassword:
 *   post:
 *     tags:
 *       - Auth
 *     name: forgotPassword
 *     summary: User forgot password
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             email:
 *               type: string
 *         required:
 *           - email
 *     responses:
 *       '200':
 *         description:reset token send in successfully
 */

/**
 * @swagger
 * /api/v1/users/resetPassword/{token}:
 *   patch:
 *     tags:
 *       - Auth
 *     name: Reset Password
 *     summary: Create validation string in reset password link to verify user's allowed to reset their password
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: params
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/User'
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *             passwordConfirm:
 *               type: string
 *         required:
 *           - token
 *     responses:
 *       '200':
 *         description: Success
 */
