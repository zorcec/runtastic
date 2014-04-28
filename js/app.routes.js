// Application's routes
(function () {

    // Registering "index" route
    App.IndexRoute = Ember.Route.extend({
        model: function () {
            // retrieve data and return model
            return App.RuntasticData.list.content.length > 0 ? App.RuntasticData : App.RuntasticData.read();
        }
    });

    // Registering a "detail" route
    App.Router.map(function () {
        this.resource('detail', { path: 'detail/:detail_id' });
    });

    // Extending the "detail" route
    // This will allow page refreshing without losing data
    App.DetailRoute = Ember.Route.extend({
        model: function (params) {
            var id = parseInt(params.detail_id);
            return App.RuntasticData.getById(id);
        }
    });

})();