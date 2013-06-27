define([],
    function () {
        self.resorts = ko.observableArray();
        self.destinations = ko.observableArray();
        self.trips = ko.observableArray();
        self.seasons = ko.observableArray();
        self.guides = ko.observableArray();
        var vm = {
            
            resorts: resorts,
            destinations: destinations,
            trips: trips,
            seasons: seasons,
            guides: guides
           
        };
        return vm;
    });