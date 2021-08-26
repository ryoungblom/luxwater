var Countries = artifacts.require("CountryData");
var Companies = artifacts.require("CompanyData");
var Marketplace = artifacts.require("luxMarketplace");

module.exports = function(deployer) {
  deployer.deploy(Countries);
  deployer.deploy(Companies);
  deployer.deploy(Marketplace)
};
