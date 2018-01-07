pragma solidity ^0.4.18;

import "./rbac/RBAC.sol";
import "./Vehicle.sol";
import "./OpenVehicle.sol";
import "./utils/Utilities.sol";

contract Registry is RBAC {
  address public creator;
  address public registrant;
  string public vin;
  mapping(string => address) VinForAddress;

    function Registry() public {
      creator = msg.sender;
    }

  // ===== Events =====
  event ClaimedVehicleRecord(
    address indexed _registrant,
    bytes32 indexed _vin,
    string _strVin,
    address indexed _vehicle
  );

  // ===== Modifiers =====
  modifier uniqueVehicle(string _strVin) {
    require(VinForAddress[_strVin] == address(0x0));
    _;
  }

  // ====== Functions ======
  function registerVehicle(
    string _strVin,
    address _registrant
  ) public
  /* ) uniqueVehicle(_strVin) public payable onlyAdmin returns (string) */
  /* ) public payable onlyAdmin */
  {
    address vehicle = new OpenVehicle(_strVin, _registrant);
    VinForAddress[_strVin] = vehicle;
    addVehicleClaim(_registrant, _strVin, vehicle);
  }

  function addVehicleClaim(
    address _registrant,
    string _strVin,
    address _vehicleContract
  ) private
  {
    ClaimedVehicleRecord(
      _registrant,
      Utilities.convertStringToBytes32(_strVin),
      _strVin,
      _vehicleContract
    );
  }

  function vehicleAddress(
    string _strVin
  ) public view returns (address)
  {
    /* require(VinForAddress[_strVin] != address(0x0)); */
    return VinForAddress[_strVin];
  }

}
