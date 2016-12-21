import http from 'http'
import fs from 'fs'
import cheerio from 'cheerio'
import request from 'request'

const url = 'http://www.ss.pku.edu.cn/index.php/newscenter/news/2391'

function fetchPage(url) {
    startRequest(url)
}

function startRequest(url) {
    http.get(url, res => {
        let html = ''
        let titles = []
        res.setEncoding('utf-8')
        res.on('data', chunk => {
            html += chunk
        })
        res.on('end', () => {
            let $ = cheerio.load(html)
            let time = $('.article-info a:first-child').next().text().trim()
            
            let news = {
                title: $('.article-title a').text().trim(),
                time: time,
                link: "http://www.ss.pku.edu.cn" + $("div.article-title a").attr('href'),
                author: $('[title=供稿]').text().trim(), 
            }

            console.log(news)
            saveArticle($)
        })
    })
}

function saveArticle ($) {
    let title = $('.article-title a').text().trim()
    $('.article-content p').each((index, item) => {
        let content = $(item).text()
        fs.appendFile(`${__dirname}/data/${title}`, content, 'utf-8', err => {
            if (err) {
                console.warn(err);
            }
        })
    })
}

fetchPage(url)