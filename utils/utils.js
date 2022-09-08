const { InternalCache } = require("elevate-node-cache");

function internalSet(key, value) {
  return InternalCache.setKey(key, value);
}
function internalGet(key) {
  return InternalCache.getKey(key);
}
function internalDel(key) {
  return InternalCache.delKey(key);
}

module.exports = {
  internalSet: internalSet,
  internalDel: internalDel,
  internalGet: internalGet,
};
