module.exports = {
    /**
     * The delay between every request in milliseconds
     * @type {number}
     */
    delay: 100,

    /**
     * Limit the number of requests
     * Set to 0 for no limit
     * 
     * @type {number}
     */
    limit: 0,

    /**
     * The message to send
     * @type {string}
     */
    message: 'Hello Earth!',

    /**
     * The URL to send the message to
     * @type {string}
     * @example ```https://secretm.me/message.php?id=LoremIpsum``` || ```https://secretm.me/message/LoremIpsum```
     */
    url: ''
};