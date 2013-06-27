define(function () {
    //var destination = function (item) {
    //   var self = this;
       
    //   self.Id = ko.observable(item ? item.Id : 0);
      
    //   self.Code = ko.observable(item ? item.Code : "");
    //   self.Name = ko.observable(item ? item.Name : "");

    //   self.isEditing = ko.observable(item ? false : true);
    //   self.dirtyFlag = new ko.DirtyFlag([self.Code, self.Name,self.Id]);
       
    //   self.isDirty = ko.computed(function () {
    //       return self.dirtyFlag().isDirty();
    //    });

    
       
    //    return self;
    //};

     function destination(item) {
        var self = this;

        self.Id = ko.observable(item ? item.Id : 0);

        self.Code = ko.observable(item ? item.Code : "");
        self.Name = ko.observable(item ? item.Name : "");

        self.isEditing = ko.observable(item ? false : true);
        self.dirtyFlag = new ko.DirtyFlag([self.Code, self.Name, self.Id]);

        self.isDirty = ko.computed(function () {
            return self.dirtyFlag().isDirty();
        });



        return self;
    };

    var resort = function (item) {
        var self = this;
        
        self.Id = ko.observable(item ? item.Id : 0);

        self.Code = ko.observable(item ? item.Code : "");
        self.Name = ko.observable(item ? item.Name : "");

        self.isEditing = ko.observable(item ? false : true);
        self.dirtyFlag = new ko.DirtyFlag([self.Code, self.Name, self.Id]);

        self.isDirty = ko.computed(function () {
            return self.dirtyFlag().isDirty();
        });



        return self;
    };
    
    var season = function (item) {
        var self = this;

        self.Id = ko.observable(item ? item.Id : 0);

        self.Code = ko.observable(item ? item.Code : "");
        self.Description = ko.observable(item ? item.Description : "");

        return self;
    };
    
    var guide = function (item) {
        var self = this;

        self.Id = ko.observable(item ? item.Id : 0);

        self.Name = ko.observable(item ? item.Name : "");
        self.Email = ko.observable(item ? item.Email : "");

        return self;
    };

    var trip = function (item) {
        var self = this;
        
       
        self.Id = ko.observable(item ? item.Id : 0);
        
        self.DestinationId = ko.observable(item ? item.DestinationId : "0");
        self.ResortId = ko.observable(item ? item.ResortId : "0");
        self.Name = ko.observable(item ? item.Name : "");
        self.isEditing = ko.observable(item ? false : true);
        self.dirtyFlag = new ko.DirtyFlag([self.DestinationId, self.ResortId, self.Name, self.Id]);

        self.tripDescription = ko.computed(function () {
            return (item ? item.Destination.Code : "DES") + " " + (item ? item.Resort.Code : "RES");
        });

        self.isDirty = ko.computed(function () {
            return self.dirtyFlag().isDirty();
        });



        return self;
    };
    
    var plannedTrip = function (item) {
        var self = this;

       
        self.Id = ko.observable(item ? item.Id : 0);
        self.SeasonCode = ko.observable(item ? item.SeasonCode : "0");
        self.DestinationId = ko.observable(item ? item.DestinationId : "");
        self.ResortId = ko.observable(item ? item.ResortId : "");
        self.Name = ko.observable(item ? item.Name : "");
        self.SeasonCode = ko.observable(item ? item.SeasonCode : "");
        self.From = ko.observable(item ? moment(item.From).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'));
        self.To = ko.observable(item ? moment(item.To).format('YYYY-MM-DD') : moment(new Date()).format('YYYY-MM-DD'));
        self.tripDescription = ko.observable(item ? item.TripDescription : "");
        self.GuideId = ko.observable(item ? item.GuideId : "");
        self.StudId = ko.observable(item ? item.StudId : "");
        self.EnokId = ko.observable(item ? item.EnokId : "");
        self.Se = ko.observable(item ? item.Se : "");
        self.No = ko.observable(item ? item.No : "");
        self.Fi = ko.observable(item ? item.Fi : "");
        self.Dk = ko.observable(item ? item.Dk : "");
        self.ReservationNumber = ko.observable(item ? item.ReservationNumber : "");
        self.FlygprintPnr = ko.observable(item ? item.FlygprintPnr : "");
        self.Pax = ko.observable(item ? item.Pax : "");
        self.DoubleBook = ko.observable(item ? item.DoubleBook : "");
        self.AlsoGuides = ko.observable(item ? item.AlsoGuides : "");
        self.Remarks = ko.observable(item ? item.Remarks : "");
        self.TravelingFunds = ko.observable(item ? item.TravelingFunds : "");
        self.GotFood = ko.observable(item ? item.GotFood : "");
        self.Lists = ko.observable(item ? item.Lists : "");
        self.TicketSent = ko.observable(item ? item.TicketSent : "");
        self.AgentInformed = ko.observable(item ? item.AgentInformed : "");
        self.InvoicePayed = ko.observable(item ? item.InvoicePayed : "");
        self.TripId = ko.observable(item ? item.TripId : "0");

        self.isEditing = ko.observable(item ? false : true);
        self.dirtyFlag = new ko.DirtyFlag([
                self.TripId,
                self.SeasonCode,
                self.To,
                self.From,
                self.GuideId,
                self.StudId,
                self.EnokId,
                self.Se,
                self.No,
                self.Fi,
                self.Dk,
                self.ReservationNumber,
                self.Pax,
                self.DoubleBook,
                self.AlsoGuides,
                self.Remarks,
                self.TravelingFunds,
                self.GotFood,
                self.Lists
        ]);

        self.isDirty = ko.computed(function () {
            return self.dirtyFlag().isDirty();
        });


        
        return self;
    };


    return {
        destination: destination,
        trip: trip,
        resort: resort,
        plannedTrip: plannedTrip,
        season: season,
        guide:guide
    };
});