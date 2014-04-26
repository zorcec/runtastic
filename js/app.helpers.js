(function () {

    // Registering a date-time helper
    // This helper will help us with a date formatting
    Ember.Handlebars.helper('format-date', function (date) {
        return moment(date).format('DD.MM.YYYY, HH.mm');
    });

})();