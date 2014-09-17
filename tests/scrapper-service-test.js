var srv = require('../app/services/htmlScrapperService');


describe('htmlScrapperService', function () {

    var config ={
        "name" : "Автобазар (после ДТП)",
        "host" : "http://avtobazar.ua",
        "searchUrl" : "/poisk/avto/?country1=1911&period=168&show_only=all&currency=1915&after_dtp=yes_only&no_customs=no&in_credit=yes&exchange=yes&rent=no&autosalon_own=yes&order=-date_last_modify",
        "titleSelector" : ".prod",
        "citySelector" : ".city",
        "priceUAHSelector" : ".price",
        "urlSelector" : ".url",
        "priceUSDSelector" : ".calc-price",
        "containerSelector" : ".res_item",
        "photoSelector" : ".photo"
    }
    it('should load first page of avtobazar', function (done) {
        srv.load(config, function (error, cars) {
            (error === null).should.be.true;
            cars.should.have.length(21);
            done();
        });
    })
})