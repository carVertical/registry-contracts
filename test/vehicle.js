const Vehicle = artifacts.require('Vehicle');

contract('Vehicle', function (accounts) {

    it('should assert true', function (done) {
        var vehicle = Vehicle.deployed();
        assert.isTrue(true);
        done();
    });

    // function addOdometerRecord(string recordHash, uint256 timestamp) public {
    //     OdometerRecord(recordHash, timestamp, now);
    // }
    it('should retrieve Odometer records', function (done) {
        Vehicle.deployed()
            .then(function (instance) {
                return instance.addOdometerRecord(
                    'd89c92b4400b15c39e462a8caa939ab40c3aeeea',
                    '1980010114898');
            })
            .then(function (result) {
                const logs = result.logs[0].args;
                assert.equal(result.logs[0].event, 'OdometerRecord');
                assert.equal(logs._timestamp.c[0], '1980010114898');
                done();
            });
    });


    // function addOdometerRecord(string recordHash, uint256 timestamp) public {
    //     OdometerRecord(recordHash, timestamp, now);
    // }
    it('should retrieve Odometer records', function (done) {
        Vehicle.deployed()
            .then(function (instance) {
                return instance.addOdometerRecord(
                    'd89c92b4400b15c39e462a8caa939ab40c3aeeea',
                    '1980010114898');
            })
            .then(function (result) {
                const logs = result.logs[0].args;
                assert.equal(result.logs[0].event, 'OdometerRecord');
                assert.equal(logs._timestamp.c[0], '1980010114898');
                done();
            });
    });

    // function addRegistrationRecord(string recordHash, uint256 timestamp) public {
    //     RegistrationRecord(recordHash, timestamp, now);
    // }
    it('should retrieve Registration records', function (done) {
        Vehicle.deployed()
            .then(function (instance) {
                return instance.addRegistrationRecord(
                    'd89c92b4400b15c39e462a8caa939ab40c3aeeea',
                    '1980010114898');
            })
            .then(function (result) {
                const logs = result.logs[0].args;
                assert.equal(result.logs[0].event, 'RegistrationRecord');
                assert.equal(logs._timestamp.c[0], '1980010114898');
                done();
            });
    });

    // function addImagesRecord(string recordHash, uint256 timestamp) public {
    //     ImagesRecord(recordHash, timestamp, now);
    // }
    it('should retrieve Images records', function (done) {
        Vehicle.deployed()
            .then(function (instance) {
                return instance.addImagesRecord(
                    'd89c92b4400b15c39e462a8caa939ab40c3aeeea',
                    '1980010114898');
            })
            .then(function (result) {
                const logs = result.logs[0].args;
                assert.equal(result.logs[0].event, 'ImagesRecord');
                assert.equal(logs._timestamp.c[0], '1980010114898');
                done();
            });
    });

    // function addDamageRecord(string recordHash, uint256 timestamp) public {
    //     DamageRecord(recordHash, timestamp, now);
    // }
    it('should retrieve Damage records', function (done) {
        Vehicle.deployed()
            .then(function (instance) {
                return instance.addDamageRecord(
                    'd89c92b4400b15c39e462a8caa939ab40c3aeeea',
                    '1980010114898');
            })
            .then(function (result) {
                const logs = result.logs[0].args;
                assert.equal(result.logs[0].event, 'DamageRecord');
                assert.equal(logs._timestamp.c[0], '1980010114898');
                done();
            });
    });

    // function addSpecsRecord(string recordHash, uint256 timestamp) public {
    //     SpecsRecord(recordHash, timestamp, now);
    // }
    it('should retrieve Specs records', function (done) {
        Vehicle.deployed()
            .then(function (instance) {
                return instance.addSpecsRecord(
                    'd89c92b4400b15c39e462a8caa939ab40c3aeeea',
                    '1980010114898');
            })
            .then(function (result) {
                const logs = result.logs[0].args;
                assert.equal(result.logs[0].event, 'SpecsRecord');
                assert.equal(logs._timestamp.c[0], '1980010114898');
                done();
            });
    });


});
