var Verifications = artifacts.require('./Verifications.sol')

module.exports = function(deployer) {
  deployer.deploy(Verifications)
}
