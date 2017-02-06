const api = require('./config.js');
// 网络请求模块
function request(url, data, successCb, errorCb) {
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 1000
  })
  wx.request({
    url: url,
    method: 'GET',
    data: data,
    success: successCb,
    error: errorCb,
    complete: function() {
      wx.hideToast();
    }
  });
}

//获取丛书列表
function getBookList(id, data, successCb, errorCb) {
    request(api.getBookList.replace(':id', id), data, successCb, errorCb);
}
//获取图书详情
function getBookById(id, successCb, errorCb) {
    request(api.getBookById + id, "", successCb, errorCb);
}
//搜索图书
function searchBook(data, successCb, errorCb) {
    request(api.searchBook, data, successCb, errorCb);
}

module.exports = {
  getBookList: getBookList,
  getBookById: getBookById,
  searchBook: searchBook
}