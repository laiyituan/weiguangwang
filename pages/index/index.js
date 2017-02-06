// //index.js
//获取应用实例
var app = getApp();
const requests = require("../../utils/requests");
var util = require("../../utils/util");

Page({
	data: {
		motto: 'Hello World',
		name: 'WeChat',
		userInfo: {},
		indicatorDots: true,
		autoplay: true,
		interval: 5000,
		duration: 1000,
		imgUrls: [
      '../../image/banner1.jpg',
      '../../image/banner2.jpg'
    ],
    toView: 'red',
    scrollTop: 100,
    toRe: 0,
    count: 0,
    bookList: [],
    noMore: false
	},
	//事件处理函数
	bindViewTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	renderBookList: function() {
		var that = this;
		that.setData({
			toRe: util.randomNum()
		})
		requests.getBookList(that.data.toRe, {start:that.data.count}, function (res) {
			if (res.data.count==0) {
        return;
      }
      console.log(res)
      res.data.books.map((item) => {
      	item.rate = item.rating.average*10 + '%'
      	return item
      })
      that.setData({
      	bookList: that.data.bookList.concat(res.data.books),
      	count: that.data.count + res.data.count
      });
      if (res.data.books.length === 0) {
      	that.setData({
      		noMore: true
      	})
      }
		})
	},
	toRefresh: function() {
		this.setData({
			bookList: [],
			count: 0,
			noMore: false
		});
		this.renderBookList()
	},
	onLoad: function() {
		this.renderBookList()
	},
	upper: function(e) {
    console.log("已到顶部");
  },
	lower: function(e) {
		console.log('已到底部')
		if (!this.data.noMore) {
			this.renderBookList()
		}
	},
	scroll: function(e) {
    console.log('我滚')
  }
})