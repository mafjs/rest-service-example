var service = require('@maf/rest-service')('myservice');

service.addMethods({
    'GET /': function (req, res) {
        res.result(['here', 'we', 'are']);
    }
});

service.listen();
