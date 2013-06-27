define(['durandal/plugins/router', 'viewmodels/repos', 'viewmodels/models', 'viewmodels/shared'],
    function (router, repos,model,shared) {

        var self = this;

        self.displayName = "Resort";
        self.initialized = false;

        self.edit = function (item) {
            item.isEditing(true);
        };
        
        self.save = function () {
            var request = repos.saveResorts(dirtyResorts());
            request.then(function () {

                return refresh();
            });

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
                self.shared.resorts.remove(item);
            else {
                item.Id(item.Id() * -1);
                
            }
        };
        self.dirtyResorts = ko.computed(function () {
            return ko.utils.arrayFilter(shared.resorts(), function (item) {
                return item.dirtyFlag().isDirty();
            });
        }, self);
       
        self.refresh = function () {
            return repos.getResorts(shared.resorts);
        };

        var addResort = function () {
            self.resorts.push(new model.resort());
        };

        var vm = {
            displayName: displayName,
            activate: activate,
            resorts: shared.resorts,
            title: 'Resorts',
            refresh: refresh,
            edit: edit,
            dirtyResorts: dirtyResorts,
            add: addResort,
            save: save,
            remove:remove
        };
        return vm;
    });