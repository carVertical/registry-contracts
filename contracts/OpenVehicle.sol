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

  function addTechSpecPrameter(string _key, string _value) {
    techSpec[_key] = _value;
    OdometerReadingEvent(_key, _value, now);
  }

}
