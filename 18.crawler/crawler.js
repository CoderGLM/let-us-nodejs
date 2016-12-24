import http from 'http'
import fs from 'fs'
import cheerio from 'cheerio'
import request from 'request'

const url = 'http://www.ss.pku.edu.cn/index.php/newscenter/news/2391'

function fetchPage (url) {
    startRequestViaRequest(url)
}

/*
 *  startRequest via http module
 */
function startRequestViaHttp (url) {
    http.get(url, res => {
        const statusCode = res.statusCode
        const contentType = res.headers['content-type']
        if (statusCode !== 200) {
            throw new Error(`Request Failed.\nStatus Code:${statusCode}`)
        }
        
        let html = ''
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

            saveArticle($)
            saveImage($)
        })
    })
}
/*
 *  startRequest via request module
 */
function startRequestViaRequest (url) {
    request(url, (error, res, body) => {
        const statusCode = res.statusCode
        const contentType = res.headers['content-type']
        if (statusCode !== 200) {
            throw new Error(`Request Failed.\nStatus Code:${statusCode}`)
        }

        let $ = cheerio.load(body)
        let time = $('.article-info a:first-child').next().text().trim()

        let news = {
            title: $('.article-title a').text().trim(),
            time: time,
            link: "http://www.ss.pku.edu.cn" + $("div.article-title a").attr('href'),
            author: $('[title=供稿]').text().trim(),
        }

        console.log(news)
        saveArticle($)
        saveImage($)
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

function saveImage ($) {
    $('.article-content img').each((index, img) => {
        let newsTitle = $('.article-title a').text().trim()
        let title = $(img).parent().next().text().trim();
        let filename = `${title}.jpg`
        let url = `http://www.ss.pku.edu.cn${$(img).attr('src')}`
        request.head(url, (err, res, body) => {
            if (err) {
                console.warn(err)
            }
        })
        request(url).pipe(fs.createWriteStream(`${__dirname}/images/${newsTitle}-${title}`))
    })
}

fetchPage(url)