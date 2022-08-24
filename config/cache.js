const { InternalCache } = require("elevate-node-cache");
module.exports = () => {
  InternalCache.init(process.env.INTERNAL_CACHE_EXP_TIME);
};
