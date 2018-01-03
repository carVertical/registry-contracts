pragma solidity ^0.4.4;

import "./rbac/RBAC.sol";

contract Vehicle is RBAC {
  address public registrant;
  string public vin;

  mapping(string => uint) latestRecordIds;

  function Vehicle(string _vin, address _registrant) public payable {
    registrant = _registrant;
    vin = _vin;
    addRole(registrant, "registrant");
  }

  // ====== Modifiers ======
 /**
 * @dev modifier to scope access to registrants
 * // reverts
 */
  modifier onlyRegistrant()
  {
    checkRole(registrant, REGISTRANT);
    _;
  }

  /**
  * @dev modifier to scope access to
  * only admins and registrants
  * // reverts
  */
  modifier onlyAdminOrRegistrant()
  {
    require(
      hasRole(msg.sender, ROLE_ADMIN) ||
      hasRole(registrant, REGISTRANT)
    );
    _;
  }

  // ====== Events ======
  event OdometerRecord(
    string _hash,
    uint256  indexed _timestamp,
    uint256 indexed _event_time
  );
  event RegistrationRecord(
    string _hash,
    uint256 indexed _timestamp,
    uint256 indexed _event_time
  );
  event ImagesRecord(
    string _hash,
    uint256 indexed _timestamp,
    uint256 indexed _event_time
  );
  event DamageRecord(
    string _hash,
    uint256 indexed _timestamp,
    uint256 indexed _event_time
  );
  event SpecsRecord(
    string _hash,
    uint256 indexed _timestamp,
    uint256 indexed _event_time
  );

  // ===== Functions =====
  function addOdometerRecord(string recordHash, uint256 timestamp) public
  onlyAdminOrRegistrant
  {
    OdometerRecord(recordHash, timestamp, now);
  }

  function addRegistrationRecord(string recordHash, uint256 timestamp) public
  onlyAdminOrRegistrant
  {
    RegistrationRecord(recordHash, timestamp, now);
  }

  function addImagesRecord(string recordHash, uint256 timestamp) public
  onlyAdminOrRegistrant
  {
    ImagesRecord(recordHash, timestamp, now);
  }

  function addDamageRecord(string recordHash, uint256 timestamp) public
  onlyAdminOrRegistrant
  {
    DamageRecord(recordHash, timestamp, now);
  }

  function addSpecsRecord(string recordHash, uint256 timestamp) public
  onlyAdminOrRegistrant
  {
    SpecsRecord(recordHash, timestamp, now);
  }
}
