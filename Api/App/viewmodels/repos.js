define(['durandal/system', 'viewmodels/models'],
    function (system, model) {
        //#region Internal methods

        var baseUri = "/Api/";
        var queryFailed = function (jqXHR, textStatus) {
            var msg = 'Error retreiving data. ' + textStatus;
            console.log(msg);
        };
        //#endregion

        var getResorts = function (resObservable) {
            resObservable([]);
            var options = {
                url: baseUri + 'Resort',
                type: 'GET',
                dataType: 'json'
            };

            return $.ajax(options).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                var list = [];

                data.forEach(function (item) {
                    list.push(new model.resort(item));
                });

                resObservable(list);


            }
        };

        var getGuides = function (guideObservable) {
            guideObservable([]);
            var options = {
                url: baseUri + 'Guide',
                type: 'GET',
                dataType: 'json'
            };

            return $.ajax(options).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                var list = [];

                data.forEach(function (item) {
                    list.push(new model.guide(item));
                });

                guideObservable(list);


            }
        };


        var getSeasons = function (seasonObservable) {
            seasonObservable([]);
            var options = {
                url: baseUri + 'Season',
                type: 'GET',
                dataType: 'json'
            };

            return $.ajax(options).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                var list = [];

                data.forEach(function (item) {
                    list.push(new model.season(item));
                });

                seasonObservable(list);
            }
        };


        var getDestinations = function (destObservable) {
            destObservable([]);
            var options = {
                url: baseUri + 'Destination',
                type: 'GET',
                dataType: 'json'
            };

            return $.ajax(options).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                var list = [];

                data.forEach(function (item) {
                    list.push(new model.destination(item));
                });

                destObservable(list);
            }
        };


        var getTrips = function (tripObservable) {
            tripObservable([]);
            var options = {
                url: baseUri + 'Trip',
                type: 'GET',
                dataType: 'json'
            };

            return $.ajax(options).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                var list = [];

                data.forEach(function (item) {
                    list.push(new model.trip(item));
                });

                tripObservable(list);


            }
        };


        var getPlannedTrips = function (tripObservable) {
            tripObservable([]);
            var options = {
                url: baseUri + 'PlannedTrip',
                type: 'GET',
                dataType: 'json'
            };

            return $.ajax(options).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
                var list = [];

                data.forEach(function (item) {
                    list.push(new model.plannedTrip(item));
                });

                tripObservable(list);


            }
        };


        var save = function (dirtyDestinations) {
            var dirty = dirtyDestinations;

            for (var o in dirty) {
                console.log(dirty[o].Id());
                if (dirty[o].Id() < 0) {
                    //alert('DELETE - ' + ko.toJSON(dirty[o]));
                    $.ajax(baseUri + "Destination?Id=" + dirty[o].Id(), {
                        type: 'DELETE',
                        data: "",//ko.toJS({ Id: dirty[o].Id(), Name: dirty[o].Name(), Code: dirty[o].Code() }),
                        success: function () {
                            // self.read();
                        }
                    });
                } else if (dirty[o].Id() > 0) {


                    $.ajax(baseUri + "Destination", {
                        type: 'PUT',
                        data: ko.toJS({ Id: dirty[o].Id(), Name: dirty[o].Name(), Code: dirty[o].Code() }),
                        success: function () {
                            //self.read();
                        }
                    });
                } else if (dirty[o].Id() == 0) {
                    //alert('POST - ' + ko.toJSON(dirty[o]));
                    $.ajax(baseUri + "Destination", {
                        type: 'POST',
                        data: ko.toJS({ Id: dirty[o].Id(), Name: dirty[o].Name(), Code: dirty[o].Code() }),
                        success: function () {
                            //self.read();
                        }
                    });
                }
            }


        };


        var savePlannedTrips = function (dirtyTrips, onsuccess) {
            var deferred = $.Deferred();
            var promise = deferred.promise();
            var dirty = dirtyTrips;
            var url = "";
            var data;

            for (var o in dirty) {
                console.log(dirty[o].Id());
                if (dirty[o].Id() < 0) {
                   
                    url = baseUri + '/PlannedTrip?Id=' + dirty[o].Id();

                     remove(url, { "": "" }, onsuccess);
                    
                } else if (dirty[o].Id() > 0) {
                  
                    url = baseUri + '/PlannedTrip?Id=' + dirty[o].Id();
                    data = ko.toJS(dirty[o]);
                     put(url, data , onsuccess);
                    
                } else if (dirty[o].Id() == 0) {
                    
                    url = baseUri + '/PlannedTrip';
                    
                    data = ko.toJS(dirty[o]);
                     post(url,data, onsuccess);
                }
            }
            return promise;

        };



        var getUser = function (userobservable) {

            return get(baseUri + 'GetCurrentUser', "", querySucceeded);
            function querySucceeded(data) {


                userobservable(data);

            }
        };


        var saveTrips = function (trips, onsuccess) {

            var inputs = [];

            for (var index in trips) {
                var trip = trips[index];
                inputs.push(trip);
            }

            var url = baseUri + '/Trip';

            return put(url, { "": inputs }, onsuccess);
        };

        var saveResorts = function (resorts, onsuccess) {

            var inputs = [];

            for (var index in resorts) {
                var resort = resorts[index];
                inputs.push(resort);
            }

            var url = baseUri + '/Resort';

            return put(url, { "": inputs }, onsuccess);
        };



        //
        var makerequest = function (type, url, data, onsuccess, onerror) {

            var deferred = $.Deferred();
            var promise = deferred.promise();

            var jqxhr = $.ajax({
                type: type,
                url: url,
                data: data,
                dataType: "json",
                success: function (returnedData) {

                    console.log("Successful request for [url: " + url + ", data: " + JSON.stringify(data) + "]");
                    if (onsuccess != undefined) {
                        onsuccess(returnedData);
                    }

                },
                error: function () {
                    console.log("Error request for [" + JSON.stringify(data) + "]");

                    if (onerror != undefined) {
                        onerror();
                    }
                }
            });

            jqxhr.success(function (data, status, xhr) {

                if (!data) {
                    deferred.reject(jqxhr, 'error');
                } else {
                    deferred.resolve(data, status, xhr);
                }
            });

            jqxhr.error(function (jqXHR, status, error) {
                var msg = 'Error retreiving data. ' + status;
                /// logger.logError(msg, jqXHR, system.getModuleId(this), true);
                deferred.reject(jqXHR, status, error);
            });

            return promise;
        };

        var get = function (url, data, success, error) {
            return makerequest("GET", url, data, success, error);
        };

        var post = function (url, data, success, error) {
            return makerequest("POST", url, data, success, error);
        };

        var put = function (url, data, success, error) {
            return makerequest("PUT", url, data, success, error);
        };

        var remove = function (url, data, success, error) {
            return makerequest("DELETE", url, data, success, error);
        };


        return {
            getDestinations: getDestinations,
            getResorts: getResorts,
            save: save,
            getTrips: getTrips,
            getUser: getUser,
            saveTrips: saveTrips,
            saveResorts: saveResorts,
            getPlannedTrips: getPlannedTrips,
            getSeasons: getSeasons,
            getGuides: getGuides,
            savePlannedTrips: savePlannedTrips
        };

    });