define(['durandal/plugins/router', 'viewmodels/repos', 'viewmodels/models'],
    function (router, repos,model) {

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
        self.add = function (item) {
          
        };

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
        };

        var vm = {
            displayName: displayName,
            activate: activate,
            destinations: destinations,
            title: 'Destinations',
            refresh: refresh,
            edit: edit,
            dirtyDestinatons: dirtyDestinatons,
            add: addDestination,
            save: save,
            remove:remove
        };
        return vm;
    });