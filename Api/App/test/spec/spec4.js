define(
    [
        "viewmodels/destinationVMTest"
    ],
    function(vmod) {
        //var testvm = new NotSoGenericViewModel();
        //beforeEach(function() {
        //    spyOn(vmod, "testfunc");


        //});


       

         //Describe the test suite for this module.
        describe(
            "testing test vm.",
            function() {

                it(
                    "add should add have called testfunc",
                    function() {


                        spyOn(vmod, "testfunc").andReturn("2222");
                        vmod.funkett();

                        expect(1).toBe(1);


                    }
                );

                it(
                    "add should add one to array length",
                    function() {
                       var originalLength = vmod.destinations().length;
                       var spyan= spyOn(vmod, "testfunc");
                        
                        vmod.addDestination();
                       
                        expect(spyan).toHaveBeenCalled();

                        expect(vmod.destinations().length).toBe(originalLength + 1);
                    }
                );

                //it(
                //    "add should add have called testfunc",
                //    function() {


                //        //var spy = spyOn(vmod, "testfunc").andCallThrough();
                //        vmod.testfunc();

                //        expect(vmod.testfunc).toHaveBeenCalled();


                //    }
                //);

                // it(
                //    "activate should call refresh",
                //    function () {


                //        var spy = spyOn(vmod, "refresh");
                //        vmod.activate();

                //        expect(spy).toHaveBeenCalled();


                //    }
                //);


               
                       it("calls the sayHello() function", function () {
                           var fakePerson = new Person();
                           spyOn(fakePerson, "sayHello");
                           fakePerson.helloSomeone("world");
                           expect(fakePerson.sayHello).toHaveBeenCalled();
                       });
                   
                       //it("calls the sayHello() function spy variable", function () {
                       //    var fakePerson = new Person();
                       //    var spy = spyOn(fakePerson, "sayHello");
                       //    fakePerson.helloSomeone("world");
                       //    expect(spy).toHaveBeenCalled();
                       //});
                     


            }
        );

        var Person = function() {
        };

        Person.prototype.helloSomeone = function(toGreet) {
            return this.sayHello() + " " + toGreet;
        };

        Person.prototype.sayHello = function() {
            return "Hello";
        };


        function NotSoGenericViewModel(baseUri, model) {
            var self = this;

            self.items = ko.observableArray([]);

            self.add = function() {
                var a = self.mockme();
                self.items.push(new model());

            };

            self.mockme = function() {
                return "mock";
            };
            self.dirtyItems = ko.computed(function() {
                return ko.utils.arrayFilter(self.items(), function(item) {
                    return item.dirtyFlag().isDirty();
                });
            }, self);

            self.remove = function(item) {
                if (typeof(item.Id) != typeof(Function) || item.Id() == 0)
                    self.items.remove(item);
                else {
                    item.Id(item.Id() * -1);
                }
            };

            self.edit = function(item) {
                item.isEditing(true);
            };

            self.save = function() {
                var dirty = self.dirtyItems();

                for (var o in dirty) {
                    if (dirty[o].Id() < 0) {
                        alert('DELETE - ' + ko.toJSON(dirty[o]));
                        $.ajax(baseUri, {
                            type: 'DELETE',
                            data: ko.toJS({ Id: dirty[o].Id(), Name: dirty[o].Name() }),
                            success: function() {
                                self.read();
                            }
                        });
                    } else if (dirty[o].Id() > 0) {
                        alert('PUT - ' + ko.toJSON(dirty[o]));
                        $.ajax(baseUri, {
                            type: 'PUT',
                            data: ko.toJS({ Id: dirty[o].Id(), Name: dirty[o].Name() }),
                            success: function() {
                                self.read();
                            }
                        });
                    } else if (dirty[o].Id() == 0) {
                        alert('POST - ' + ko.toJSON(dirty[o]));
                        $.ajax(baseUri, {
                            type: 'POST',
                            data: ko.toJS({ Id: dirty[o].Id(), Name: dirty[o].Name() }),
                            success: function() {
                                self.read();
                            }
                        });
                    }
                }
            };

        }
    }
);