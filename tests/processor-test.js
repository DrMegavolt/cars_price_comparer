var processor = require('../app/services/processor');
var mongoose = require('mongoose');
config = require('../config/config'),

mongoose.connect(config.db);
describe('processor ', function () {



    it('should load all cars ', function (done) {
        processor.process(null, null);

    })
})