var srv = require('../app/grabbers').ajaxGrabber;


describe('ajaxScrapperService', function () {

    var config = {
            name:'Auto.RIA (после ДТП)',
            listRequestMode:'AJAX',
            itemRequestMode:'AJAX',
            host:'http://auto.ria.com',
            searchUrl: '/blocks_search_ajax/search/?countpage=10&category_id=1&view_type_id=0&page=0&marka=0&model=0&s_yers=0&po_yers=0&state=0&city=0&price_ot=&price_do=&currency=1&gearbox=0&type=0&drive_type=0&door=0&color=0&metallic=0&engineVolumeFrom=&engineVolumeTo=&raceFrom=&raceTo=&powerFrom=&powerTo=&power_name=1&fuelRateFrom=&fuelRateTo=&fuelRatesType=city&custom=0&damage=2&saledParam=0&under_credit=0&confiscated_car=0&auto_repairs=0&with_exchange=0&with_real_exchange=0&exchangeTypeId=0&with_photo=0&with_video=0&is_hot=0&vip=0&checked_auto_ria=0&top=8&order_by=0&hide_black_list=0&auto_id=&auth=0&deletedAutoSearch=0&user_id=0&scroll_to_auto_id=0&expand_search=0&can_be_checked=0&last_auto_id=0&matched_country=-1&seatsFrom=&seatsTo=&wheelFormulaId=0&axleId=0&carryingTo=&carryingFrom=&search_near_states=0&company_id=0&company_type=0',
            itemUrl:'/blocks_search_ajax/view/auto/{0}?lang_id=2',
            idsSelector : 'result.search_result.ids',
            titleSelector: 'result.auto_data.model_data.name',
            citySelector: 'result.location_data.city.name',
            priceUAHSelector: '',
            urlSelector: '/auto_xxxx_{0}.html',
            priceUSDSelector: 'result.price_data.main_price',

            sellerNameSelector: "result.user_data.firstName",
            sellerPhoneSelector: "result.user_phones[0].phone_formatted",
            photoSelector: 'result.photo_data.photo.url',
            descriptionSelector:'result.description',
            shortDescriptionSelector:'result.description'

        };
    it('should load first page of autoria', function (done) {
        srv.load(config).then(function (cars) {
            cars.should.have.length(10);
            done();
        });
    })
})