//########################   Bank Account  ####################################

/**
 * @swagger
 * /api/v1/bankAccount/getAll:
 *   get:
 *     tags:
 *       - Bank Accounts
 *     name: Get all Bank Accounts
 *     summary: Get all Bank Accounts
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
 *       - name: isActive
 *         in: query
 * 
 *     responses:
 *       '200':
 *         description: Success
 */