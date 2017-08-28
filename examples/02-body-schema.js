var service = require('@maf/rest-service')('myservice');

var joi = service.joi;

service.addMethods({
    'POST /':  {
        schema: {
            body: joi.object().required().keys({
                name: joi.string().required()
            })
        },
        handler: function (req, res) {
            res.result(req.body);
        }
    }

});

service.listen();
