function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//随机一个200内的数字，用于调用首页列表
function randomNum() {
  let num = Math.random();
  num = Math.ceil(num * 200); //num*200的取值范围在0~200之间,使用向上取整就可以得到一个1~200的随机数
  return num.toString()
}

module.exports = {
  formatTime: formatTime,
  randomNum: randomNum
}
