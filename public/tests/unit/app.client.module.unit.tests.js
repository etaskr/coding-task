describe('Testing App Main Module', function () {

    beforeEach(function () {        
    });
    
    it('Should be registered', function () {
        expect(angular.module('app')).toBeDefined();
    });

    it('Should be registered', function () {
        expect(angular.module('weatherForecast')).toBeDefined();
    });
});