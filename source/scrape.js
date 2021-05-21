/**
 * @name scrape.js
 * @description an interface for scraping for images using
 *              cheerio.js
 */
const getRandomInt  = require("./random.js")
const cheerio       = require("cheerio")
const url           = require('url')
const axios         = require('axios')
/**
 * @name    scrape
 * 
 * @brief   Scraper to get all href tags, randomly select one,
 *          then pull the main image from there. Lots of these 
 *          functions used are deprecated, this function needs
 *          to be re-worked.
 * @param   term    The search term to pull a gif from.
 * @return  string  The gif image url.
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
        let srcUrl = url.parse($(e).attr('src'))
        if (!srcUrl.host) {
            images.push(url.resolve(reqUrl, srcUrl))
        } else {
            images.push(url.format(srcUrl))
        }
    });
    let choice = getRandomInt(images.length)

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