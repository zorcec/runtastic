// Application's controllers
(function () {

    // Extending Ember application with "index" controller
    App.IndexController = Ember.Controller.extend({
        actions: {
            sortBy: function (sortBy) {
                var order = App.RuntasticData.list.sortAscending;
                var column = App.RuntasticData.list.get('sortProperties')[0];

                // determine order
                if (sortBy == column) {
                    App.RuntasticData.list.toggleProperty('sortAscending');
                }

                App.RuntasticData.list.set('sortProperties', [sortBy]);
                
            },
            paginateTo: function (page) {
                // set page and refresh
                App.SortOptionsServerSide.currentPage = page;
                App.RuntasticData.read();
            },
            paginateToPrev: function () {
                // set page and refresh
                if (App.SortOptionsServerSide.currentPage > 1) {
                    App.SortOptionsServerSide.currentPage--;
                    App.RuntasticData.read();
                }
            },
            paginateToNext: function () {
                // set page and refresh
                if (App.SortOptionsServerSide.currentPage < App.RuntasticData.totalPages) {
                    App.SortOptionsServerSide.currentPage++;
                    App.RuntasticData.read();
                }
            },
            paginateToLast: function (page) {
                // set page and refresh
                if (App.SortOptionsServerSide.currentPage < App.RuntasticData.totalPages) {
                    App.SortOptionsServerSide.currentPage = App.RuntasticData.totalPages;
                    App.RuntasticData.read();
                }
            },
            paginateToFirst: function (page) {
                // set page and refresh
                if (App.SortOptionsServerSide.currentPage > 1) {
                    App.SortOptionsServerSide.currentPage = 1;
                    App.RuntasticData.read();
                }
            },
        }
    });

})();