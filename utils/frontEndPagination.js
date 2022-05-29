/**
 * provideFrontEnd
 * @function
 * @param {string} totalData ,
 * @param {string} currentPage ,
 * @param {string} pageLimit ,
 * @return {Object}
 */
 exports.paginationInfo = async (totalData, currentPage, pageLimit) => {
    currentPage = currentPage ? currentPage : 1;
    pageLimit = pageLimit ? pageLimit : 25;
  
    let totalPages = totalData / pageLimit;
    if (!Number.isInteger(totalPages)) {
      totalPages = Math.trunc(totalPages) + 1;
    }
  
    return { pages: totalPages, currentPage };
  };
  