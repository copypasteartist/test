define(['viewmodels/repos', 'viewmodels/models'],
    function (repos,model) {

        var self = this;

        self.displayName = "Destinations";

        self.destinations = ko.observableArray();
        self.initialized = false;

        self.edit = function (item) {
            item.isEditing(true);
        };
        
        self.save = function () {
            repos.save(dirtyDestinatons());
            return refresh();

        };

        //self.add = function (item) {
          
        //};

        self.activate = function () {
            if (initialized) { return; }
            initialized = true;
            return refresh();
        };
        self.remove = function (item) {
            if (typeof (item.Id) != typeof (Function) || item.Id() == 0)
                self.destinations.remove(item);
            else {
                item.Id(item.Id() * -1);
                
            }
        };
        self.dirtyDestinatons = ko.computed(function () {
            return ko.utils.arrayFilter(self.destinations(), function (item) {
                return item.dirtyFlag().isDirty();
            });
        }, self);
       
        self.refresh = function () {
            return repos.getDestinations(destinations);
        };

        var addDestination = function () {
            
            self.destinations.push(new model.destination());
            testfunc();
        };

         self.testfunc = function () {
            
             return "1111";

         };
         self.funkett = function () {
             var a = testfunc();
             console.log(a);
             return a;

         };

        var vm = {
            displayName: displayName,
            activate: activate,
            destinations: destinations,
            title: 'Destinations',
            refresh: refresh,
            edit: edit,
            dirtyDestinatons: dirtyDestinatons,
            addDestination: addDestination,
            save: save,
            remove: remove,
            testfunc: testfunc,
            funkett:funkett
        };
        return vm;
    });