//########################   Message Docs  ####################################

/**
 * @swagger
 * /api/v1/questionReport/create/{roomId}:
 *   post:
 *     tags:
 *       - Question Report
 *     name: Question Report
 *     summary: Create Question Report
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
 *             reportTitle:
 *               type: string
 *               required: true
 *             reportDescription:
 *               type: integer
 *               required: true
 *         required:
 *           - reportTitle
 *           - reportDescription
 *     responses:
 *       '200':
 *         description: Create Message in successfully
 */

/**
 * @swagger
 * /api/v1/questionReport/getOne/{id}:
 *   get:
 *     tags:
 *       - Question Report
 *     name: Get one Question Report
 *     summary: Get one Question Report
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
 * /api/v1/questionReport/submit/{questionId}:
 *   post:
 *     tags:
 *       - Question Report
 *     name: Submit Question Report
 *     summary: Submit Question Report
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
 *             questionReportId:
 *               type: string
 *               required: true
 *             questionType:
 *               type: string
 *               required: true
 *             reportedText:
 *               type: string
 *               required: false
 *         required:
 *           - questionReportId
 *           - questionType
 *           - reportedText
 *     responses:
 *       '200':
 *         description: Question Report submitted successfully
 */


