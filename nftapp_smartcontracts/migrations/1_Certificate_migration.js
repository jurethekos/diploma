const Certificate = artifacts.require("Certificate");
const SSI = artifacts.require("SSI");

module.exports = function (deployer) {
    deployer.deploy(Certificate);
    deployer.deploy(SSI);
}