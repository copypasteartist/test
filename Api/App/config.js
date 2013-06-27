define(function () {


    var routes = [{
        url: 'welcome',
        moduleId: 'viewmodels/welcome',
        caption: 'Start',
        name: '<i class="icon-home"></i>',
        visible: true,
        group: ['']
    }, {
        url: 'plannedtrip',
        moduleId: 'viewmodels/plannedtrip',
        caption: 'Planned trips',
        name: '<i class="icon-list"></i>',
        visible: true,
        group: ['calc', 'pricing']
    }
        , {
        url: 'destination',
        moduleId: 'viewmodels/destination',
        caption: 'Destinations',
        name: '<i class="icon-list"></i>',
        visible: true,
        group: ['calc','pricing']
    }, {
        url: 'trip',
        moduleId: 'viewmodels/trip',
        caption: 'Trip',
        name: '<i class="icon-th"></i>',
        visible: true,
        group:['pricing']
        
    }, {
        url: 'resort',
        moduleId: 'viewmodels/resort',
        caption: 'Resort',
        name: '<i class="icon-th"></i>',
        visible: true,
        group: ['pricing']

    }
    ];

    var startModule = 'start';

    return {
        
        routes: routes,
        startModule: startModule
    };
});