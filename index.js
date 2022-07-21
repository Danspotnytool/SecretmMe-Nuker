
const phin = require('phin');
const HTMLparser = require('node-html-parser');

const config = require('./config.js');

// Checking if the config is valid
if (config.message.length <= 6) {
    console.log('Error: The message is too short!');
    process.exit(1);
};
if (!config.url.toLocaleLowerCase().startsWith('https://secretm.me/message')) {
    console.log('Error: The URL is not valid!');
    process.exit(1);
};

let loopIndex = 0;

// Getting the inbox ID
const inboxID = config.url.match(/id=([^&]*)/) ? config.url.match(/id=([^&]*)/)[1] : config.url.replace('https://secretm.me/message/', '');
console.log(inboxID);

const main = async () => {

    await phin({
        url: 'https://secretm.me/message_h.php',
        referrer: `https://secretm.me/message/${inboxID}`,
        referrerPolicy: 'strict-origin-when-cross-origin',
        method: 'POST',
        data: `name=${inboxID}&ans1=${encodeURIComponent(config.message)}&agree=on`,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "content-type": "application/x-www-form-urlencoded",
        },
        parse: 'string'
    }).then(async (res) => {
        console.log(`[${loopIndex}] Message sent!`);
        loopIndex++;
        setTimeout(async () => {
            if (config.limit == 0 || loopIndex < config.limit) {
                await main();
            } else {
                console.log('Done!');
            };
        }, config.delay);
    });
};

main();