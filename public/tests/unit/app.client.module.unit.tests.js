describe('Testing App Main Module', function () {
    var mainModule;

    beforeEach(function () {
        mainModule = angular.module('app');
    });
    
    it('Should be registered', function () {
        expect(mainModule).toBeDefined();
    });
});