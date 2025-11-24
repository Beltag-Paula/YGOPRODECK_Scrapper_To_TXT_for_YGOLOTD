const { JSDOM } = require('jsdom');

const fs = require('node:fs')

const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

/* Ternary Operator https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator*/
function getCards(document, deckID) {
    const deck = document.getElementById(deckID)
    return deck ? Array.from(deck.querySelectorAll('img.master-duel-card')).map(card => card.getAttribute('data-cardname')) : []
}


/* First method: I was trying to first create the myDeck.txt file, than using the second commented method to replace, in order to make it
readable for the exe that converts the txt into ydc file 
function createTxt(contentList, fileTxt) {
    fs.appendFileSync(fileTxt, JSON.stringify(contentList, null, 2), 'utf-8');
}


function getTextAndReplace(document, x, y){
    fs.readFile(document, 'utf-8', (err, data)=>{
        if (err) throw err;

        //const result = data.toString().split(x).join(y)
        const result = data.split(x).join(y)

        return fs.writeFileSync(document, result, 'utf-8');
    })
}*/


/* Second method:
    Spread Syntax (...) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  & Destructuring https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring*/
function writeData(main_deck, extra_deck, side_deck) {
    const data = [
        "[main]",
        ...main_deck,
        "[extra]",
        ...extra_deck,
        "[side]",
        ...side_deck,
        "[unknown]"
    ];

    fs.writeFileSync("myDeck.txt", data.join("\n"));
}

function structureData(main_deck, extra_deck, side_deck) {
    return [
        "[main]",
        ...main_deck,
        "[extra]",
        ...extra_deck,
        "[side]",
        ...side_deck,
        "[unknown]"
    ].join("\n");
}

async function extract(URL) {
    const response = await fetch(URL);

    const htmlContent = await response.text()

    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;

    const main_deck = getCards(document, "main_deck")
    const extra_deck = getCards(document, "extra_deck")
    const side_deck = getCards(document, "side_deck")

    return structureData(main_deck, extra_deck, side_deck);

    // writeData(main_deck, extra_deck, side_deck);

    /*First method
     fs.appendFileSync('myDeck.txt', '[main]', 'utf8');
     createTxt(main_deck, "myDeck.txt");
     fs.appendFileSync('myDeck.txt', '[extra]', 'utf8');
     createTxt(extra_deck, "myDeck.txt");
     fs.appendFileSync('myDeck.txt', '[side]', 'utf8');
     createTxt(side_deck, "myDeck.txt");
     fs.appendFileSync('myDeck.txt', '[unknown]', 'utf8');
     */

}

//extract("https://ygoprodeck.com/deck/yummy-voiceless-voice-667390");

/* First method
const x = '"';
const y = ' ';

getTextAndReplace("myDeck.txt", x, y);

getTextAndReplace("myDeck.txt", ",","");

getTextAndReplace("myDeck.txt", " ","");
getTextAndReplace("myDeck.txt", "][","]");
*/

app.use(express.static('public'))
app.use(express.json());

// middleware to parse just text
// app.use(express.text())
/* read more on middleware
app.use((req,res, next) => {
    console.log('we are in middleware', req.path);
    next();
})
    */
/*
app.get('/', (req, res) => {
 console.log('gimme the file')
 // Send the HTML file as the response
 res.sendFile(path.join(__dirname, "public", 'index.html'));
});
*/

app.post('/extract', async (req, res) => {

    console.log(req.body.url);
    try{
        const data = await extract(req.body.url);
        res.send(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("An error occured");
    }
});

app.listen(PORT,
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    }); 