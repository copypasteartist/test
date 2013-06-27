define(
    [
        "viewmodels/models"
    ],
    function (model) {


        // Describe the test suite for this module.
        describe(
            "Destination model",
            function () {


                // Create our test module.
                var item = {};
                item.Id = 55;
                item.Code = "LPA";
                item.Name = "LALA LAND";
                var dest = new model.destination(item);

                it(
                    "dest id should be what i set it to",
                    function () {

                       
                        expect(dest.Id()).toBe(55);
           
                    }
                );
                
                 it(
                     "should be dirty if i update value",
                     function () {

                         dest.Code("KKK");
                         
                         expect(dest.dirtyFlag().isDirty()).toBe(true);

                     }
                 );
                
             


            }
        );


    }
);