import axios from 'axios';
import cheerio from 'cheerio';

export const routeCharacter = (req,res) => {
    const url = `https://kimetsu-no-yaiba.fandom.com/wiki/${req.params.character}`;
    const titles = [];
    const details = [];
    const characters = [];
    const characterObj = {};
    try {
        axios.get(url).then((res) => {
            const $ = cheerio.load(res.data);
            $("aside", res.data).each(function () {
                // Get the title
                $(this).find("section > div > h3").each(function () {
                    titles.push($(this).text());
                })
                // Get character details
                $(this).find("section > div > div").each(function () {
                    details.push($(this).text());
                })
                console.log("titles", titles);
                console.log("details", details);
                for (let i = 0; i < titles.length; i++) {
                    characterObj[titles[i]] = details[i];
                }
                characters.push({...characterObj});
            })
        })
        res.status(200).json(characters) 
    } catch (err) {
        res.status(500).json(err);
    }
}