define(['durandal/plugins/router', 'viewmodels/repos', 'viewmodels/models', 'viewmodels/shared'],
    function (router, repos, model, shared) {

        var self = this;

        self.displayName = "Planned Trips";
        self.plannedTrips = ko.observableArray();
        self.initialized = false;

        self.edit = function (item) {
            item.isEditing(true);
        };

        self.savePlannedTrips = function () {

            var request = repos.savePlannedTrips(dirtyTrips());
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

                self.plannedTrips.remove(item);
            else {
                item.Id(item.Id() * -1);
            }
        };
        self.dirtyTrips = ko.computed(function () {
            return ko.utils.arrayFilter(self.plannedTrips(), function (item) {
                return item.dirtyFlag().isDirty();
            });
        }, self);

        self.refresh = function () {
            repos.getGuides(shared.guides);
            repos.getTrips(shared.trips);
            repos.getSeasons(shared.seasons);
            return repos.getPlannedTrips(plannedTrips);
        };

        var addPlannedTrip = function () {
            self.plannedTrips.push(new model.plannedTrip());
        };

        var vm = {
            displayName: displayName,
            activate: activate,
            title: 'Planned Trips',
            refresh: refresh,
            edit: edit,
            dirtyTrips: dirtyTrips,
            plannedTrips: plannedTrips,
            addPlannedTrip: addPlannedTrip,
            savePlannedTrips: savePlannedTrips,
            remove: remove,
            seasons: shared.seasons,
            trips: shared.trips,
            guides: shared.guides

        };
        return vm;
    });