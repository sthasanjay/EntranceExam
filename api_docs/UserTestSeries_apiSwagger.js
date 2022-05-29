/**
 * @swagger
 * /api/v1/userTestSeries/generateUserTemplateQuestion/{templateId}:
 *   get:
 *     tags:
 *       - User Test Series
 *     name: Generate User Test Series
 *     summary: Generate User Test Series
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: templateId
 *         in: path
 *     responses:
 *       '200':
 *         description: Success
 *
 */


/**
 * @swagger
 * /api/v1/userTestSeries/submitUserTestSeries/{id}:
 *   put:
 *     tags:
 *       - User Test Series
 *     name: Submit User Test Series
 *     summary: Submit User Test Series
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             selectedAnswer:
 *               type: string
 *               required: true
 *             isCorrect:
 *               type: boolean
 *               required: true
 *             duration:
 *               type: integer
 *               required: true
 *         required:
 *           - selectedAnswer
 *           - isCorrect
 *           - duration
 *     responses:
 *       '200':
 *         description: Create Message in successfully
 */



/**
 * @swagger
 * /api/v1/userTestSeries/testSeriesSummary/{logId}:
 *   get:
 *     tags:
 *       - User Test Series
 *     name: Generate User Test Series
 *     summary: Generate User Test Series
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: logId
 *         in: path
 *     responses:
 *       '200':
 *         description: Success
 *
 */

/**
 * @swagger
 * /api/v1/userTestSeries/testSeriesScore/{templateId}:
 *   get:
 *     tags:
 *       - User Test Series
 *     name: User Test Series ScoreBoard
 *     summary: User Test Series
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: define the limit per page
 *       - name: page
 *         in: query
 *         description: define the page of the listing
 *       - name: templateId
 *         in: path
 *     responses:
 *       '200':
 *         description: Success
 *
 */


/**
 * @swagger
 * /api/v1/userTestSeries/latestScore/{templateType}:
 *   get:
 *     tags:
 *       - User Test Series
 *     name: User Test Series LatestScore By type
 *     summary: User Test Series LatestScore By type
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: templateType
 *         in: path
 *       - name: limit
 *         in: query
 *         description: define the limit per page
 *       - name: page
 *         in: query
 *         description: define the page of the listing
 
 *     responses:
 *       '200':
 *         description: Success
 *
 */
