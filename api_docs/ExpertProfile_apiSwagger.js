//########################   Expert Profile Docs  ####################################

/**
 * @swagger
 * /api/v1/expertProfile/create:
 *   post:
 *     tags:
 *       - Expert Profile
 *     name: create
 *     summary: Create Expert Profile
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
 *             password:
 *               type: string
 *               required: true
 *             passwordConfirm:
 *               type: string
 *               required: true
 *             description:
 *               type: string
 *               required: true
 *             expertiseFields:
 *               type: string
 *               required: true
 *             remarks:
 *               type: string
 *               required: false
 *             subjects:
 *               type: Array
 *               required: true
 *         required:
 *           - firstName
 *           - lastName
 *           - email
 *           - phoneNumber
 *           - password
 *           - passwordConfirm
 *           - description
 *           - expertiseFields
 *           - scopeCategoryId
 *           - subjectCategoryId
 *     responses:
 *       '200':
 *         description: Create Discussion in successfully
 */

/**
 * @swagger
 * /api/v1/expertProfile/edit/{id}:
 *   put:
 *     tags:
 *       - Expert Profile
 *     name: update
 *     summary:  Update  ExpertProfile
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
 *             password:
 *               type: string
 *               required: true
 *             passwordConfirm:
 *               type: string
 *               required: true
 *             description:
 *               type: string
 *               required: true
 *             expertiseFields:
 *               type: string
 *               required: true
 *             scopeCategoryId:
 *               type: integer
 *               required: true
 *             remarks:
 *               type: string
 *               required: false
 *             subjectCategoryId:
 *               type: integer
 *               required: true
 *         required:
 *           - firstName
 *           - lastName
 *           - email
 *           - phoneNumber
 *           - password
 *           - passwordConfirm
 *           - description
 *           - expertiseFields
 *           - scopeCategoryId
 *           - subjectCategoryId
 *     responses:
 *       '200':
 *         description: Create Discussion in successfully
 */

/**
 * @swagger
 * /api/v1/expertProfile/getOne/{id}:
 *   get:
 *     tags:
 *       - Expert Profile
 *     name: Get one ExpertProfile
 *     summary: Get one ExpertProfile
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
 */

/**
 * @swagger
 * /api/v1/expertProfile/getAll:
 *   get:
 *     tags:
 *       - Expert Profile
 *     name: Get Expert list
 *     summary: Get Expert list
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
 *       - name: sort
 *         in: query
 *         description: sort value can be "createdAt_ASC" for ascending and "createdAt_DESC" for descending 
 *       - name: subjectId
 *         in: query
 *       - name: courseName_substring
 *         in: query
 *         description: use _substring to any table fields for like type search
 *     responses:
 *       '200':
 *         description: Success
 *
 */
