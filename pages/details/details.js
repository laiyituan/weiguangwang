//details.js
const requests = require('../../utils/requests')
Page({
  renderBookDetail: function(options) {
    var that = this;
    requests.getBookById(options.id, function(res) {
      console.log(res)
      res.data.rate = res.data.rating.average * 10 + '%'
      that.setData({
        bookInfo: res.data
      })
    });
  },
  onLoad: function (options) {
    this.renderBookDetail(options);
  }
})
