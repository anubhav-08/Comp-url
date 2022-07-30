const Counter = require('../Models/Counter')

const shortUrlGen = async () => {
    var counter = await Counter.findOne()
        .then(Cr => 
            {
                Cr.value += 1;
                Cr.save()
                return Cr.value;
            })
        .catch(err => {
            const count = new Counter({
                value: 100000001
            });
            count.save()
                .then(data => data.value)
                .catch(err => res.status(500).send({ "message": "technical error" }))
        });
    const url = await base10to62(counter);
    return url;
}

const base10to62 = async (n) => {
    elements = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    surl = "";
    while (n > 0) {
        surl = surl + elements.charAt(n % 62);
        n = Math.floor(n / 62);
    }
    while (surl.length < 7) {
        surl = surl + '0';
    }
    return surl;
}
module.exports = shortUrlGen;