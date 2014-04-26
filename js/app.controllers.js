// Application's controllers
(function () {

    // Extending Ember application with "index" controller
    App.IndexController = Ember.Controller.extend({
        actions: {
            sortBy: function (sortBy) {
                var order;
                var changeOrder;

                // determine order
                changeOrder = (sortBy == App.Settings.sortBy) ? true : false;
                if (changeOrder) {
                    if (App.Settings.order == 'asc') order = 'desc';
                    else order = 'asc';
                } else {
                    order = 'asc';
                }

                // set ordering and refresh
                App.Settings.sortBy = sortBy;
                App.Settings.order = order;
                App.RuntasticData.read();
            }
        }
    });

})();