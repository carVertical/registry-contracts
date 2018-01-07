const Registry = artifacts.require('Registry');

contract('Registry', function (accounts) {

    it('should assert true', function (done) {
        var registry = Registry.deployed();
        assert.isTrue(true);
        done();
    });

    // function addVehicleClaim(address _registrant, string _strVin, address _vehicleContract) public {
    //     ClaimedVehicleRecord(_registrant, Utilities.convertStringToBytes32(_strVin), _strVin, _vehicleContract);
    // }
    it('should retrieve VehicleClaim records', function (done) {
        Registry.deployed()
            .then(function (instance) {
                return instance.addVehicleClaim(
                    0x79f17EF469EfF7Fd51a28de840CC6BAb2E4b5B0D,
                    'VIN123ABX456',
                    0xb5c97fa8bf32f30a71d4e02060e0559573c24cf8);
            })
            .then(function (result) {
                console.log('logs');
                console.log(result);
                const logs = result.logs[0].args;
                console.log(logs);
                assert.equal(logs._registrant, '0x79f17ef469eff6eeb18a1060bf8f554f00000000');
                assert.equal(logs._vehicle, '0xb5c97fa8bf32ef3fdc87ff033eaeefe800000000');
                assert.equal(logs._strVin, 'VIN123ABX456');
                assert.equal(logs._vin, '0x56494e3132334142583435360000000000000000000000000000000000000000');
                assert.equal(result.logs[0].event, 'ClaimedVehicleRecord');
                done();
            });
    });


});
