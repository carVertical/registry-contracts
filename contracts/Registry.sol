pragma solidity ^0.4.18;

import "./rbac/RBAC.sol";
import "./Vehicle.sol";
import "./utils/Utilities.sol";

contract Registry is RBAC {
  address public creator;
  address public registrant;
  string public vin;
  mapping(string => VehicleDetails) VinForAddress;

    function Registry() public {
      creator = msg.sender;
    }


  // ===== Enums  =====
  // VehicleOwnership enumerator used to define a state
  // of it's ownership. Details about vehicle can be already
  // added to the database however vehicle itself is not claimed.
  enum VehicleOwnership { Claimed, Unclaimed, Unkown }

  // ===== Structures =====
  struct VehicleDetails {
    address vehicleAddress;
    address registrantAddress;
    VehicleOwnership state;
  }


  // ===== Events =====
  event ClaimedVehicleRecord(
    address indexed _registrant,
    bytes32 indexed _vin,
    string _strVin,
    address indexed _vehicle
  );

  // ====== Functions ======
  function registerVehicle(string _strVin, address _registrant) public payable
  onlyAdmin
  {
    address vehicle = new Vehicle(_strVin, _registrant);
    VinForAddress[_strVin].vehicleAddress = vehicle;
    VinForAddress[_strVin].registrantAddress = _registrant;
    VinForAddress[_strVin].state = VehicleOwnership.Claimed;
    addVehicleClaim(_registrant, _strVin, vehicle);
  }

  function addVehicleClaim(address _registrant, string _strVin, address _vehicleContract) public {
    ClaimedVehicleRecord(_registrant, Utilities.convertStringToBytes32(_strVin), _strVin, _vehicleContract);
  }

  function getMapping(string _vin) public constant returns (address add) {
    return VinForAddress[_vin].vehicleAddress;
  }


}
