const Registry = artifacts.require('./Registry.sol');
const Vehicle = artifacts.require('./Vehicle.sol');
const RBAC = artifacts.require('./rbac/RBAC.sol');
const Roles = artifacts.require('./rbac/Roles.sol');
const Utilities = artifacts.require('./utilities/Utilities.sol');
const VehicleHelper = artifacts.require('./common/VehicleHelper.sol');

module.exports = function (deployer) {
  deployer.deploy(Roles);
  deployer.link(Roles, RBAC);
  deployer.deploy(RBAC);
  deployer.link(RBAC, Registry);
  deployer.link(RBAC, Vehicle)
  deployer.deploy(Utilities);
  deployer.link(Utilities, Registry);
  deployer.deploy(VehicleHelper);
  deployer.link(VehicleHelper, Vehicle);
  deployer.deploy(
    Vehicle,
    'VINXXX1234134',
    '0x79f17ef469eff7fd51a28de840cc6bab2e4b5b0d'
  );
  deployer.link(Vehicle, Registry);
  deployer.deploy(Registry);
};
