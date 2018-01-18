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
                const logs = result.logs[0].args;
                assert.equal(logs._registrant, '0x79f17ef469eff6eeb18a1060bf8f554f00000000');
                assert.equal(logs._vehicle, '0xb5c97fa8bf32ef3fdc87ff033eaeefe800000000');
                assert.equal(logs._strVin, 'VIN123ABX456');
                assert.equal(logs._vin, '0x56494e3132334142583435360000000000000000000000000000000000000000');
                assert.equal(result.logs[0].event, 'ClaimedVehicleRecord');
                done();
            });
    });


    it('should create a claimed vehicle contract', function (done) {
        Registry.deployed()
            .then(function (instance) {
                meta = instance;
                return meta.registerVehicle(
                    'VIN123XYZ',
                    0xb5c97fa8bf32f30a71d4e02060e0559573c24cf9);
            })
            .then(function (result) {
                assert.equal(result.receipt.status, 1);
                done();
            });
    });

    it('should not create contract as it is already claimed', function (done) {
        Registry.deployed()
            .then(function (instance) {
                meta = instance;
                meta.registerVehicle(
                    'VINCHECK123',
                    0xb5c97fa8bf32f30a71d4e02060e0559573c24cf9);
                return meta.registerVehicle(
                    'VINCHECK123',
                    0xb5c97fa8bf32f30a71d4e02060e0559573c24cf9);
            }).catch(function(error) {
                const revert = error.message.search('revert') >= 1;
                assert.equal(revert, true);
                done();
        });
    });

    /* Given the fact 'VINSHOULDTRANSFEROWNERSHIP123' was registered to
        0xb5c97fa8bf32f30a71d4e02060e0559573c24cf9,
        test the updateVehicleRegistrant function where
        transfer of RBAC 'registrant' role should be transfered to
        new address 0xb1a11aa1bf32f22bc0c5af543304066e00000000 and
        old registrant removed
     */
    it('should transfer ownership', function (done) {
        Registry.deployed()
            .then(function (instance) {
                meta = instance;
                return Promise.all([
                    meta.registerVehicle(
                        'VINSHOULDTRANSFEROWNERSHIP123',
                        0xb5c97fa8bf32f30a71d4e02060e0559573c24cf9),
                    meta.updateVehicleRegistrant(
                        'VINSHOULDTRANSFEROWNERSHIP123',
                        0xb1a11aa1bf32f30a71d4e02060e0559573c24cf9)
                ]);
            })
            .then(function(results) {
                const before = results[0];
                const after = results[1];
                const beforeRes = before.logs.filter(function(obj, index){
                    return obj.event === 'RoleAdded';
                });
                assert.equal(beforeRes[1].args.addr, '0xb5c97fa8bf32ef3fdc87ff033eaeefe800000000');
                assert.equal(beforeRes[1].args.roleName, 'registrant');

                const afterRes = after.logs.filter(function(obj, index){
                    return obj.event === 'RoleAdded';
                });
                assert.equal(afterRes[0].args.addr, '0xb1a11aa1bf32f22bc0c5af543304066e00000000');
                assert.equal(afterRes[0].args.roleName, 'registrant');
                done();
            });
    });

});
