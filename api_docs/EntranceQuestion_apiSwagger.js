//########################  Question Level  Docs  ####################################

/**
 * @swagger
 * /api/v1/entrancequestion/getAllEntranceQuestion:
 *   get:
 *     tags:
 *       - Entrance Question
 *     name: Get Entrance Question list
 *     summary: Get Entrance Question list
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
 *       - name: levelId
 *         in: query
 *       - name: courseId
 *         in: query
 *       - name: subjectId
 *         in: query
 *       - name: chapterId
 *         in: query
 *       - name: weight
 *         in: query
 *       - name: isActive
 *         in: query
 *       - name: question_substring
 *         in: query
 *         description: use _substring to any table fields for like type search
 *     responses:
 *       '200':
 *         description: Success
 *
 */
