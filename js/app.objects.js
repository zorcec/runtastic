(function () {

    // Extending Ember application with a object that will contain data retrieved from the Runtastic API
    App.RuntasticData = Ember.Object.extend({});

    // Extending Ember application with a object that will contain settings
    App.Settings = Ember.Object.extend({});

    // Extending the RuntasticData object
    // Defining methods & objects needed to retrieve/store data from the Runtastic API
    App.RuntasticData.reopenClass({
        list: [],
        read: function () {
            // this method will return list data

            console.log('sortBy', App.Settings.sortBy);
            console.log('order', App.Settings.order);

            // start spinner
            $('body')
                .spin('large')
                .addClass('spinner-parent');
            $('table').fadeTo(200, 0.5);

            var data = {
                sort_by: App.Settings.sortBy,
                order: App.Settings.order
            };

            return $.getJSON('http://intense-bastion-3210.herokuapp.com/run_sessions.json', data).then(function (response) {
                var list = response.run_sessions;

                //clear and set fresh data
                App.RuntasticData.list.clear();
                App.RuntasticData.list.pushObjects(list);

                // stop spinner
                $('body')
                    .spin(false)
                    .removeClass('spinner-parent');
                $('table').fadeTo(200, 1);

                return App.RuntasticData;
            });
        }
    });

    // Extending the Settings object
    // This object contains app's default settings
    App.Settings.reopenClass({
        sortBy: 'start_time',
        order: 'desc'
    });

})();