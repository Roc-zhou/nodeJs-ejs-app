

module.exports.dealDate = date => {
  if (date === undefined || date === null) {
    return null
  }
  date = new Date(date);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let m1 = date.getMinutes();
  let s = date.getSeconds();
  m = m < 10 ? ("0" + m) : m;
  d = d < 10 ? ("0" + d) : d;
  h = h < 10 ? ("0" + h) : h;
  m1 = m1 < 10 ? ("0" + m1) : m1;
  s = s < 10 ? ('0' + s) : s;
  return y + "-" + m + "-" + d + " " + h + ":" + m1 + ":" + s;
}