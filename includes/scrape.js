/**
 * @name scrape.js
 * @description an interface for scraping for images using
 *              cheerio.js
 */
const getRandomInt = require("./random.js")
const cheerio = require("cheerio")
const url = require('url')
const axios = require('axios')
/**
 * build scraper to scrape all href tags, random select one,
 * then pull the main image from there. only pull hrefs with 
 * search term
 */
module.exports = scrape = async (term) => {
    term = term.split('/')[1]
    let website = `https://tenor.com/search/anime-${term}-gifs`
    if (!website) {
        console.log("bad scrape")
        return
    }
    let images = []
    const response = await axios.get(website)
    let $ = cheerio.load(response.data);
    let reqUrl = url.parse(website);
    $('img').map(function(i, e) {
        let srcUrl = url.parse($(e).attr('src'));
        if (!srcUrl.host) {
            images.push(url.resolve(reqUrl, srcUrl));
        } else {
            images.push(url.format(srcUrl));
        }
    });
    let choice = getRandomInt(images.length)
    // console.log(choice, images.length)
    // console.log(images)

    while (
        images[choice].includes('/assets/img/') || 
        images[choice].includes('logo') ||
        images[choice].includes('/ads/') ||
        images[choice].includes('/widget/') ||
        images[choice].includes('c.tenor.com')
        ) {
            
        choice = getRandomInt(images.length)
        if (images[choice].includes('anime'))
            break
        }

    return images[choice]
}