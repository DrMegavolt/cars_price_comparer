var srv = require('../app/services/htmlScrapperService');


describe('htmlScrapperService', function () {
    "use strict";
    it('should load first page of avtobazar', function (done) {
        srv.load(function (error, cars) {
            (error === null).should.be.true;
            cars.should.have.length(21);
            done();
        });
    })
})