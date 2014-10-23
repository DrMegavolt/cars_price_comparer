var srv = require('../app/grabbers/htmlScrapperService');


describe('ajaxScrapperService', function () {

    //var config ={
    //    "name" : "Автобазар (после ДТП)",
    //    "host" : "http://avtobazar.ua",
    //    "searchUrl" : "/poisk/avto/?country1=1911&period=168&show_only=all&currency=1915&after_dtp=yes_only&no_customs=no&in_credit=yes&exchange=yes&rent=no&autosalon_own=yes&order=-date_last_modify",
    //    "titleSelector" : ".prod",
    //    "citySelector" : ".city",
    //    "priceUAHSelector" : ".price",
    //    "urlSelector" : ".url",
    //    "priceUSDSelector" : ".calc-price",
    //    "containerSelector" : ".res_item",
    //    "photoSelector" : ".photo"
    //}
    var config = {
        'name': 'RST.UA (после ДТП)',
        'listRequestMode': 'HTML',
        'itemRequestMode': 'HTML',
        'encoding':"cp1251",
        'host': 'http://rst.ua',
        'searchUrl': '/oldcars/?task=newresults&make%5B%5D=0&year%5B%5D=0&year%5B%5D=0&price%5B%5D=0&price%5B%5D=0&engine%5B%5D=0&engine%5B%5D=0&gear=0&fuel=0&drive=0&condition=4&from=sform',
        'containerSelector': ".rst-ocb-i",
        'titleSelector': '.rst-ocb-i-h span',
        'citySelector': '.rst-ocb-i-d-l-j .rst-ocb-i-d-l-i-s:first-child',
        'priceUAHSelector': '.rst-ocb-i-d-l-i-s.rst-ocb-i-d-l-i-s-p',
        'urlSelector': '.rst-ocb-i-a',
        'priceUSDSelector': 'span.rst-uix-grey',
        'sellerNameSelector': ".rst-page-oldcars-item-option-block-container b",
        'sellerPhoneSelector': ".rst-page-oldcars-item-option-block-container",
        'photoSelector': 'img.rst-ocb-i-i',
        'descriptionSelector': '#rst-page-oldcars-item-option-block-container-desc',
        'shortDescriptionSelector': '#rst-page-oldcars-item-option-block-container-desc'

    };
    it('should load first page of rst', function (done) {
        srv.load(config).then(function (cars) {
            cars.length.should.be.greaterThan(9); //10 items on page + promo items
            done();
        }).catch(function(error, x){
            done(error)
                        console.log(error);
        });
    })
})