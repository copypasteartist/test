define(['viewmodels/destinationVMTest'], function (sut) {
    describe('durandal/viewEngine', function() {

        describe('isViewUrl', function() {
            it('returns false when view extension not found', function() {
                //var isViewUrl = sut.isViewUrl('test');
                var plutt = new sut();
                //var init = sut.initialized;
                plutt.displayName = "kke";
               // expect(init).toBe(false);
            });

        });
    });
});