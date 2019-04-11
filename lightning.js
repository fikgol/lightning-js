// Setup lnd rpc
const config = require('./config');
var fs = require("fs");
var grpc = require('grpc');
process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA'

var lndCert = fs.readFileSync("tls.cert");
var credentials = grpc.credentials.createSsl(lndCert);
var lnrpcDescriptor = grpc.load("rpc.proto");
var lnrpc = lnrpcDescriptor.lnrpc;

// trying to unlock the wallet:
if (config.lnd.password) {
    console.log('trying to unlock the wallet');
    var walletUnlocker = new lnrpc.WalletUnlocker(config.lnd.url, credentials);
    walletUnlocker.unlockWallet(
	{
	    wallet_password: config.lnd.password,
	},
	function(err, response) {
	    if (err) {
		console.log('unlockWallet failed, probably because its been aleady unlocked');
	    } else {
		console.log('unlockWallet:', response);
	    }
	},
    );
}
module.exports = new lnrpc.Lightning(config.lnd.url, credentials);

