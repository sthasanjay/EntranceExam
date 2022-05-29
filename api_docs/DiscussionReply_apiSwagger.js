//########################   Discussion Reply Docs  ####################################

/**
 * @swagger
 * /api/v1/discussionReply/create/{discussionId}:
 *   post:
 *     tags:
 *       - Discussion Reply
 *     name: create
 *     summary: Create DiscussionReply
 *     security:
 *       - bearerAuth: []
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: discussionId
 *         in: path
 *       - name: body
 *         in: body
 *         schema:
 *           properties:
 *             scopeCategoryId:
 *               type: integer
 *               required: true
 *             discussCategoryId:
 *               type: integer
 *               required: true
 *             replyMessage:
 *               type: string
 *               required: true
 *         required:
 *           - scopeCategoryId
 *           - discussCategoryId
 *           - replyMessage
 *     responses:
 *       '200':
 *         description: Create Discussion in successfully
 */

/**
 * @swagger
 * /api/v1/discussionReply/edit/{id}:
 *   put:
 *     tags:
 *       - Discussion Reply
 *     name: Update DiscussionReply
 *     summary: Update DiscussionReply
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
 *             discussionId:
 *               type: string
 *               required: true
 *             replyMessage:
 *               type: string
 *               required: true
 *             scopeCategoryId:
 *               type: string
 *               required: true
 *             discussCategoryId:
 *               type: string
 *               required: true
 *         required:
 *           - discussionId
 *           - replyMessage
 *           - scopeCategoryId
 *           - discussCategoryId
 *     responses:
 *       '200':
 *         description: Update Discussion in successfully
 */

/**
 * @swagger
 * /api/v1/discussionReply/getOne/{id}:
 *   get:
 *     tags:
 *       - Discussion Reply
 *     name: Get one DiscussionReply
 *     summary: Get one DiscussionReply
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
 * /api/v1/discussionReply/getAll:
 *   get:
 *     tags:
 *       - Discussion Reply
 *     name: Get DiscussionReply List
 *     summary: Get DiscussionReply List
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
 *       - name: discussionId
 *         in: query
 *       - name: replyMessage_substring
 *         in: query
 *         description: use _substring to any table fields for like type search
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Success
 *
 */
