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
            },
            paginateTo: function (page) {
                // set page and refresh
                App.Settings.currentPage = page;
                App.RuntasticData.read();
            },
            paginateToPrev: function () {
                // set page and refresh
                if (App.Settings.currentPage > 1) {
                    App.Settings.currentPage--;
                    App.RuntasticData.read();
                }
            },
            paginateToNext: function () {
                // set page and refresh
                if (App.Settings.currentPage < App.RuntasticData.totalPages) {
                    App.Settings.currentPage++;
                    App.RuntasticData.read();
                }
            },
            paginateToLast: function (page) {
                // set page and refresh
                if (App.Settings.currentPage < App.RuntasticData.totalPages) {
                    App.Settings.currentPage = App.RuntasticData.totalPages;
                    App.RuntasticData.read();
                }
            },
            paginateToFirst: function (page) {
                // set page and refresh
                if (App.Settings.currentPage > 1) {
                    App.Settings.currentPage = 1;
                    App.RuntasticData.read();
                }
            }
        }
    });

})();