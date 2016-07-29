describe('Weather Forecast E2E Tests:', function () {
    describe('Current temperature page', function () {
        beforeEach(function() {
            browser.get('https://localhost:8082/');
        });

        it('Should have a title', function () {
            expect(browser.getTitle()).toEqual('Weather - Current Temperature');
        });
    });
});