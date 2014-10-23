var srv = require('../app/grabbers').htmlDetailsGrabber;


describe('htmlDetailsScrapperService', function () {

    var config =
    {
        "name" : "Автобазар (после ДТП)",
        "host" : "http://avtobazar.ua",
        "listRequestMode" : "HTML",
        "itemRequestMode" : "HTML",
        "searchUrl" : "/poisk/avto/?country1=1911&period=168&show_only=all&currency=1915&after_dtp=yes_only&no_customs=no&in_credit=yes&exchange=yes&rent=no&autosalon_own=yes&order=-date_last_modify",
        "titleSelector" : ".prod",
        "citySelector" : ".city",
        "priceUAHSelector" : ".price",
        "urlSelector" : ".url",
        "priceUSDSelector" : ".calc-price",
        "containerSelector" : ".res_item",
        "sellerNameSelector" : ".nm_salon",
        "sellerPhoneSelector" : ".phones",
        "photoSelector" : ".photo",
        "descriptionSelector" : ".description",
        "shortDescriptionSelector" : ".car_dop_info"
    }
    it('should load first page of avtobazar', function (done) {
        srv.load(config, {
            site:'http://avtobazar.ua',
            relativeUrl:'/vaz-kalina-2008-kiev-1-4184737-1.html'
        }).then(function (car) {
            console.trace(car);
            done();
        }).catch(done);
    })
})