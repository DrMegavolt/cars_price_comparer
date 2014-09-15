var srv = require('../app/services/emailService');


describe('emailService', function () {
    it('should send email', function (done) {
        srv.sendNewCarsEmail([{title:'xxx'}],  function (error, cars) {

            done();
        });
    })
})