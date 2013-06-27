define(['durandal/plugins/router', 'viewmodels/repos', 'viewmodels/models', 'viewmodels/shared'],
    function (router, repos, model,shared) {

        var self = this;

        self.displayName = "Trips";
        self.destinations = ko.observableArray();
        self.resorts2 = ko.observableArray();
        self.trips2 = ko.observableArray();
        self.initialized = false;

        self.edit = function (item) {
            item.isEditing(true);
        };

        self.saveTrips = function () {

            var request = repos.saveTrips(dirtyTrips());
            request.then(function () {
               
                return refresh();
           });
        };
      

        self.activate = function () {
            if (initialized) { return; }
            initialized = true;
            return refresh();
        };
        self.remove = function (item) {
            if (typeof (item.Id) != typeof (Function) || item.Id() == 0)
           // if (item.Id() == 0)
                self.shared.trips.remove(item);
            else {
                item.Id(item.Id() * -1);

            }
        };
        self.dirtyTrips = ko.computed(function () {
            return ko.utils.arrayFilter(shared.trips(), function (item) {
                return item.dirtyFlag().isDirty();
            });
        }, self);

        self.refresh = function () {
            repos.getResorts(shared.resorts);
            repos.getDestinations(destinations);
            return repos.getTrips(shared.trips);
        };

        var addTrip = function () {
            self.trips.push(new model.trip());
        };

        var vm = {
            displayName: displayName,
            activate: activate,
            //trips: trips,
            title: 'Trips',
            refresh: refresh,
            edit: edit,
            dirtyTrips: dirtyTrips,
            destinations:destinations,
            addTrip: addTrip,
            saveTrips: saveTrips,
            remove: remove,
            resorts: shared.resorts,
            trips: shared.trips
        };
        return vm;
    });