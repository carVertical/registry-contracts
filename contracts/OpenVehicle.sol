pragma solidity ^0.4.18;


contract OpenVehicle {
  address public registrant;
  string public vin;

  mapping(string => string) public techSpec;

  struct OdometerReading {
    uint256 value;
    uint256 timestamp;
  }

  OdometerReading public latestOdometerReading;

  // Periodic Tech Inspection
  uint256 public ptiValidUntil;

  function OpenVehicle(
    string _vin,
    address _registrant
  ) public
  {
    registrant = _registrant;
    vin = _vin;
  }

  // ====== Events ======
  event TechSpecEvent(
    string _key,
    string _value,
    uint256 indexed _event_time
  );
  event OdometerReadingEvent(
    uint256 _value,
    uint256 indexed _timestamp,
    uint256 indexed _event_time
  );
  event AddPTIEvent(
    uint256 _valid_until,
    uint256 _timestamp,
    uint256 indexed _event_time
  );

  // ===== Functions =====
  function addOdometerRecord(
    uint256 _value,
    uint256 _timestamp
  ) public
  {
    if (_timestamp > latestOdometerReading.timestamp) {
      latestOdometerReading = OdometerReading(_value, _timestamp);
    }

    OdometerReadingEvent(_value, _timestamp, now);
  }

  function addTechSpecValue(
    string _key,
    string _value
  ) public
  {
    techSpec[_key] = _value;
    TechSpecEvent(_key, _value, now);
  }

  function addPTIRecord(
    uint256 _valid_until,
    uint256 _timestamp
  ) public
  {
    ptiValidUntil = _valid_until;
    AddPTIEvent(_valid_until, _timestamp, now);
  }

  function ptiIsValid() public view returns (bool) {
    return ptiValidUntil > now;
  }

}
