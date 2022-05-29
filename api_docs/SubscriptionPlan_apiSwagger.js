//########################  Course Docs  ####################################

/**
 * @swagger
 * /api/v1/subscriptionPlan/getAll:
 *   get:
 *     tags:
 *       - Subscription Plan
 *     name: Get Subscription Plan
 *     summary: Get Subscription Plan
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
 *       - name: subscriptionTitle_substring
 *         in: query
 *         description: use _substring to any table fields for like type search
 *     responses:
 *       '200':
 *         description: Success
 *
 */
