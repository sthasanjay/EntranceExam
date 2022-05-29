//########################   Discussion Docs  ####################################

/**
 * @swagger
 * /api/v1/discussion/create:
 *   post:
 *     tags:
 *       - Discussion
 *     name: create
 *     summary: Create Discussion
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
 *             question:
 *               type: string
 *               required: true
 *             discussCategoryId:
 *               type: number
 *               required: true
 *             scopeCategoryId:
 *               type: number
 *               required: true
 *         required:
 *           - question
 *           - discussCategoryId
 *     responses:
 *       '200':
 *         description: Create Discussion in successfully
 */

/**
 * @swagger
 * /api/v1/discussion/edit/{id}:
 *   put:
 *     tags:
 *       - Discussion
 *     name: Update Discussion
 *     summary: Update Discussion
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
 *             question:
 *               type: string
 *               required: true
 *             image:
 *               type: string
 *               required: true
 *             discussCategoryId:
 *               type: number
 *               required: true
 *             scopeCategoryId:
 *               type: number
 *               required: true
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: Success
 *
 */

/**
 * @swagger
 * /api/v1/discussion/getOne/{id}:
 *   get:
 *     tags:
 *       - Discussion
 *     name: Get one Discussion
 *     summary: Get one Discussion
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
 * /api/v1/discussion/getAll:
 *   get:
 *     tags:
 *       - Discussion
 *     name: Get Discussion list
 *     summary: Get Discussion list
 *     security:
 *       - bearerAuth: []
 *     parameters:    
 *       - name: limit
 *         in: query
 *         description: define the limit per page
 *       - name: page
 *         in: query
 *         description: define the page of the listing
 *       - name: sort
 *         in: query
 *         description: sort value can be "createdAt_ASC" for ascending and "createdAt_DESC" for descending 
 *       - name: scopeCategoryId
 *         in: query
 *       - name: discussCategoryId
 *         in: query
 *       - name: question_substring
 *         in: query
 *         description: use _substring to any table fields for like type search
 *     responses:
 *       '200':
 *         description: Success
 *
 */
