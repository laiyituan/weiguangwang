const apiUrl = "https://api.douban.com/v2/book/";

module.exports = {
  getBookById: apiUrl,
  getBookList: apiUrl + "series/:id/books",
  searchBook: apiUrl + "search"
}