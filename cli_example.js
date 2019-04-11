let lightning = require('./lightning');

lightning.getInfo({}, function(err, info) {
    if (err) return console.log(err);
    console.log("node info:", info);
});

lightning.addInvoice({ memo: "yo, bro", value: 10 }, async function(err, invoice) {
    if (err) return console.log(err);
    console.log("payment request:", invoice.payment_request);
});

