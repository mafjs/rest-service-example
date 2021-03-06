var service = require('@maf/rest-service')('myservice');

service.config.set('port', 3000);

var joi = service.joi;

service.addMethods({
    'GET /': {

        handler: function (req, res) {
            res.result(['here', 'we', 'are']);
        }
    },
    'POST /': {
        schema: {
            body: joi.object().required().keys({
                name: joi.string().required()
            })
        },

        handler: function (req, res) {
            var item = req.body;
            res.result(item);
        }
    }
});

service.listen();
