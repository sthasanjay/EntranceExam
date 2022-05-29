/**
 * @swagger
 * /api/v1/startTest/generate:
 *   post:
 *     tags:
 *       - Start Test
 *     name: Generate Start Test
 *     summary: Generate Start Test
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: scopeCategoryId
 *         in: query
 *         description: define the scopeCategoryId
 *       - name: files
 *         in: file
 *         type: file
 *         description: define the scopeCategoryId
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             chapters:
 *               type: Array
 *               required: true
 *             weight:
 *               type: string
 *               required: false
 *             questionNumber:
 *               type: string
 *               required: false
 *         required:
 *           - chapters
 *           - weight
 *           - questionNumber
 *     responses:
 *       '200':
 *         description: Generate Start Test successfully
 */

/**
 * @swagger
 * /api/v1/startTest/submitQuestion/{questionId}:
 *   post:
 *     tags:
 *       - Start Test
 *     name: Submit Question
 *     summary: Submit Question
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: questionId
 *         in: path
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             startTestLogId:
 *               type: integer
 *               required: true
 *             submittedOption:
 *               type: string
 *               required: true
 *         required:
 *           - startTestLogId
 *           - submittedOption
 *     responses:
 *       '200':
 *         description: Submit Question successfully
 */


/**
 * @swagger
 * /api/v1/startTest/submitStartTest/{startTestLogId}:
 *   patch:
 *     tags:
 *       - Start Test
 *     name: Submit Start Test
 *     summary: Submit Start Test
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: startTestLogId
 *         in: path
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             isSubmitted:
 *               type: boolean
 *               required: true
 *         required:
 *           - isSubmitted
 *     responses:
 *       '200':
 *         description: Submit Start Test successfully
 */

/**
 * @swagger
 * /api/v1/startTest/performanceSummary/{startTestLogId}:
 *   get:
 *     tags:
 *       - Start Test
 *     name: Get performanceSummary
 *     summary: Get performanceSummary
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: startTestLogId
 *         in: path
 *     responses:
 *       '200':
 *         description: Success
 *
 */