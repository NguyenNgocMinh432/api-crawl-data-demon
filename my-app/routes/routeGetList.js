import axios from 'axios';
import cheerio from 'cheerio';

const url = "https://kimetsu-no-yaiba.fandom.com/wiki/Kimetsu_no_Yaiba_Wiki"
export const routeGetList = (req, res, next) => {
    const thumbnails = [];
    const limit = Number(req.query.limit);
    try {
        axios(url).then(function(response) {
            const html = response.data;
            const $ = cheerio.load(html);
            $(".portal", html).each(function(){
                const name = $(this).find("a").attr("title");
                const url = $(this).find("a").attr("href");
                const image = $(this).find("a > img").attr("data-src");
                console.log(`name:${name}, url:${url}, image:${image}`);
                thumbnails.push({
                    name,
                    url: "http://localhost:3000/v1" + url.split("/wiki")[1],
                    image
                })
            })
            if ( limit && limit > 0 ) {
                res.status(200).json(thumbnails.slice(0,limit))
            } else {
                res.status(200).json(thumbnails);
            }
        })
    } catch(err) {
        res.status(500).json(err);
    }
}