const Query = require('rz-mysql')
const config = require('../config/index').dbConfig


const query = new Query(config);

module.exports = (sql, val = []) => {
  return query.sql(sql, val)
}