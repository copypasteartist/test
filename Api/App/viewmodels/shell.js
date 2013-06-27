//define(['durandal/plugins/router', 'durandal/app', 'viewmodels/repos'], function (router, app,repo) {

//    return {
//        user: ko.observable(),
//        router: router,
//        search: function() {
//            //It's really easy to show a message box.
//            //You can add custom options too. Also, it returns a promise for the user's response.
//            app.showMessage('Search not yet implemented...');
//        },
//        getUser: function () {
//            //It's really easy to show a message box.
//            //You can add custom options too. Also, it returns a promise for the user's response.
            
//           // var user = "";

//            return repo.getUser(this.user);
           
//        },
//        activate: function () {
//            getUser;
//            return router.activate('welcome');
//        }
//    };
//});


define(['durandal/plugins/router', 'durandal/app', 'viewmodels/repos','config'],
    function (router, app, repo,config) {
       

        var username = ko.observable();
        function getuser() {

            return repo.getUser(username);
        }
        

        

     
        
        function filterRoutes(group) {

            var routes = config.routes;
            var list = [];
            for (var o in group) {

                for (var r in routes) {
                    var arr = routes[r].group.filter(function (g) {

                        return g == group[o] || g == '';
                    });

                    if (arr.length > 0) {
                        
                        if (list.indexOf(routes[r]) == -1)
                            list.push(routes[r]);
                    }
                }


            }

            return list;

        }

        function activate() {
            var myroutes = filterRoutes(['calc','pricing','']);
            console.log(myroutes);
            getuser(username());
            console.log(config.routes);
            router.map(myroutes);
          
            return router.activate('plannedtrip');
        }
        
        function search() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        }
        

        var shell = {
            activate: activate,
            router: router,
            getuser: getuser,
            search: search,
            username: username,
            filterRoutes: filterRoutes

        };
        return shell;
    }
);