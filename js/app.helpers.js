(function () {

    // Registering a date-time helper
    // This helper will help us with a date formatting
    Ember.Handlebars.helper('format-date', function (date) {
        return moment(date).format('DD.MM.YYYY, HH.mm');
    });

    // Register a new type of DOM element
    // This input will format date
    App.DateTime = Em.TextField.extend({
        init: function () {
            this._super();
            var date = this.get("value");
            var value = moment(date).format('DD.MM.YYYY, HH.mm');
            this.set("value", value);
        }
    });

})();