// Application's objects
(function () {

    // Extending Ember application with a object that will contain data retrieved from the Runtastic API
    App.RuntasticData = Ember.Object.extend({});

    // Extending Ember application with a object that will contain settings
    App.SortOptionsClient = Ember.Object.extend({});

    // Extending Ember application with a object that will contain sort options
    App.SortOptionsServerSide = Ember.Object.extend({});

    // Extending the RuntasticData object
    // Defining methods & objects needed to retrieve/store data from the Runtastic API
    App.RuntasticData.reopenClass({
        list: Ember.ArrayController.create({
            content: [],
            sortProperties: ['start_time'],
            sortAscending: false
        }),
        pagination: [],
        totalPages: 0,
        read: function () {
            // this method will return list data

            // start spinner
            $('body')
                .spin('large')
                .addClass('spinner-parent');
            $('table').fadeTo(200, 0.5);

            var order = App.SortOptionsServerSide.selected !== undefined && App.SortOptionsServerSide.selected.value != '-' ? App.SortOptionsServerSide.selected.value : App.SortOptionsServerSide.oldOrder;
            var data = {
                sort_by: App.SortOptionsServerSide.column,
                order: order,
                page: App.SortOptionsServerSide.currentPage
            };

            return $.getJSON('http://intense-bastion-3210.herokuapp.com/run_sessions.json', data).then(function (response) {
                var list = response.run_sessions;
                var pagination = response.meta.pagination;
                var currentPage = App.SortOptionsServerSide.currentPage;
                var difference = 0;

                // numbers generation
                var numbers = [];
                var startNum = currentPage - 2;
                var endNum = currentPage + 2;

                //correct numbers if start number is to big
                if (startNum < 1) {
                    difference = startNum * -1;
                    startNum = 1;
                    endNum += difference + 1;
                }

                //correct numbers if end number is to big
                if (endNum > pagination.available_pages) {
                    difference = (endNum - pagination.available_pages) * -1;
                    endNum = pagination.available_pages;
                    startNum += difference;
                }

                // generate numbers
                for (i = startNum; i <= endNum; i++) {
                    numbers.push({
                        number: i,
                        isActive: (i === currentPage) ? true : false // check if that page is the active one
                    });
                }

                //clear and set data
                App.RuntasticData.list.content.clear();
                App.RuntasticData.pagination.clear();
                App.RuntasticData.list.content.pushObjects(list);
                App.RuntasticData.pagination.pushObjects(numbers);
                App.RuntasticData.totalPages = pagination.available_pages;

                // stop spinner
                $('body')
                    .spin(false)
                    .removeClass('spinner-parent');
                $('table').fadeTo(200, 1);

                //reset selects
                $('.table select').val('-');
                App.set('SortOptionsServerSide.selected', { value: '-' });

                return App.RuntasticData;
            });
        },
        getById: function (id) {
            // this method will return item by id
            var list = App.RuntasticData.list.content;

            // start spinner
            $('body')
                .spin('large')
                .addClass('spinner-parent');
            $('table').fadeTo(200, 0.5);;

            if (list.length == 0) {
                // page is reloaded; lets retrieve item by it's id
                return $.getJSON('http://intense-bastion-3210.herokuapp.com/run_sessions/' + id + '.json').then(function (response) {

                    // stop spinner
                    $('body')
                        .spin(false)
                        .removeClass('spinner-parent');
                    $('table').fadeTo(200, 1);

                    return response.run_session;
                });
            } else {

                // stop spinner
                $('body')
                    .spin(false)
                    .removeClass('spinner-parent');
                $('table').fadeTo(200, 1);

                return list.content.findBy('id', id);
            }
        }
    });

    // Extending the Settings object
    // This object contains app's default settings for server side processing
    App.SortOptionsServerSide.reopenClass({
        selected: { value: 'desc' },
        oldOrder: 'desc',
        column: 'start_time',
        currentPage: 1,
        options: [
           { value: '-', name: '-' },
           { value: 'asc', name: 'asc' },
           { value: 'desc', name: 'desc' }
        ],
        // observe selection change
        sortOptionsSelected: function () {
            if (this.selected !== undefined && App.SortOptionsServerSide.selected.value != '-') {
                App.RuntasticData.read();
            }
        }.observes('selected')
    });

})();