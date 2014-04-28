(function () {

    // Registering a date-time helper
    // This helper will help us with a date formatting
    Ember.Handlebars.helper('format-date', function (date) {
        return moment(date).format('DD.MM.YYYY, HH.mm');
    });

    // Register a new type of an element
    // This input will format date
    App.DateTime = Ember.TextField.extend({
        init: function () {
            this._super();
            var date = this.get('value');
            var value = moment(date).format('DD.MM.YYYY, HH.mm');
            this.set('value', value);
        }
    });

    // Register a new type of an element
    // Add posibility to read column name from select box
    App.OrderBySelect = Ember.Select.extend({
        didInsertElement: function () {
            $('.table select').val('-');
        },
        valueChanged: function () {
            var column = this.get('columnBinding')._from.split('.')[2];
            App.SortOptionsServerSide.column = column;
            App.SortOptionsServerSide.oldOrder = this.get('value');
        }.observes('value'),
    });

    // Register a new type of an element
    // This will render google map
    App.GoogleMap = Ember.View.extend({
        didInsertElement: function () {

            // grab the google map container
            var container = $('#googleMapContainer')[0];

            // this is required for the map to be rendered
            $(container).css({ width: '100%', height: '300px' });

            // get an encoded trace
            var encodedTrace = this.get('value');

            // sanity check
            if (encodedTrace == null) return;

            // decode the trace
            var decodedTrace = google.maps.geometry.encoding.decodePath(encodedTrace);

            // create the LatLng object 
            var center = new google.maps.LatLng(0, 0);

            // gmap options
            var options = {
                center: center,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var trace = new google.maps.Polyline({
                path: decodedTrace,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            // create the map
            var map = new google.maps.Map(container, options);

            // find & set center 
            var bounds = new google.maps.LatLngBounds();
            trace.getPath().forEach(function (LatLng) {
                bounds.extend(LatLng);
            });
            map.fitBounds(bounds);

            // set polyline
            trace.setMap(map);
        }
    });
})();