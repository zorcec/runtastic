// Application's routes
(function () {

    // Registering "index" route
    App.IndexRoute = Ember.Route.extend({
        model: function () {
            // retrieve data and return model
            return App.RuntasticData.read();
        }
    });

})();