const { Op } = require("sequelize");
const apiFeature = (queryParameters) => {
  console.log("asdsadasd", queryParameters);
  let query = queryParameters;
  let limit = queryParameters.limit || 25;
  //2
  let page = queryParameters.page * 1 - 1;
  let offset = page * limit || 0;
  const queryObj = { ...query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  let filtered = Object.keys(queryObj).filter((el) => el.includes("_"));

  filtered.forEach((el) => {
    switch (el.split("_")[1]) {
      case "substring":
        queryObj[el.split("_")[0]] = { [Op.substring]: queryParameters[el] };
        break;
      case "gt":
        queryObj[el.split("_")[0]] = { [Op.gt]: queryParameters[el] };
        break;
      case "gte":
        queryObj[el.split("_")[0]] = { [Op.gte]: queryParameters[el] };
        break;
      case "lt":
        queryObj[el.split("_")[0]] = { [Op.lt]: queryParameters[el] };
        break;
      case "lte":
        queryObj[el.split("_")[0]] = { [Op.lte]: queryParameters[el] };
        break;
      case "ne":
        queryObj[el.split("_")[0]] = { [Op.ne]: queryParameters[el] };
        break;
      default:
        queryObj[el.split("_")[0]] = { [Op.substring]: queryParameters[el] };
    }

    delete queryObj[el];
  });

  let order = ["createdAt", "DESC"];
  if (queryParameters.sort) {
    order = queryParameters.sort.split("_");
  }

  let attributes = undefined;
  if (queryParameters.fields) {
    attributes = queryParameters.fields.split(",");
  }

  return {
    queryObj,
    offset,
    limit,
    order,
    attributes,
  };
};

module.exports = apiFeature;
