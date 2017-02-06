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
	//事件处理函数
	bindViewTap: function () {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	searchKey: function (e) {
		var that = this
		that.setData({
			searchKey: e.detail.value
		})
		that.setData({
			resultList: [],
			count: 0,
			noMore: false
		})
	},
	renderSearchList: function (data) {
		var that = this
		requests.searchBook(data, function (res) {
			if (res.data.books.length === 0) {
				that.setData({
					noMore: true
				})
			}
			res.data.books.map((item) => {
				item.rate = item.rating.average * 10 + '%'
				return item
			})
			that.setData({
				resultList: that.data.resultList.concat(res.data.books),
				count: that.data.count + res.data.count
			})
		})
	},
	searchBook: function () {
		var that = this
		that.renderSearchList({ q: that.data.searchKey });
	},
	lower: function () {
		console.log('到底部啦')
		var that = this
		if (!that.data.noMore) {
			that.renderSearchList({
				q: that.data.searchKey,
				start: that.data.count
			});
		}
	},
	onLoad: function () {
		console.log('onLoad')
		var that = this
		//调用应用实例的方法获取全局数据
		app.getUserInfo(function (userInfo) {
			//更新数据
			that.setData({
				userInfo: userInfo
			})
		})
	}
})