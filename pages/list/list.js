// search.js
//获取应用实例
var app = getApp()
const requests = require("../../utils/requests");

Page({
	data: {
		motto: 'Hello World',
		name: 'WeChat',
		userInfo: {},
		searchKey: '',
		resultList: [],
		count: 0,
		noMore: false
	},
	renderList: function(data) {
		var that = this
		requests.searchBook(data, function(res) {
			if (res.data.books.length === 0) {
      	that.setData({
      		noMore: true
      	})
      }
			res.data.books.map((item) => {
				item.rate = item.rating.average*10 + '%'
      	return item
			})
			that.setData({
				resultList: that.data.resultList.concat(res.data.books),
				count: that.data.count + res.data.count
			})
		})
	},
	lower: function() {
		console.log('到底部啦')
		var that = this
		if (!that.data.noMore) {
			that.renderList({
				tag: that.data.searchKey,
				start: that.data.count
			});
		}
	},
	onLoad: function (options) {
		var that = this
		that.setData({
			searchKey: options.tag
		})
		that.renderList({tag: options.tag})
	}
})