var service = require('@maf/rest-service')('myservice');

var joi = service.joi;

service.addMethods({
    'GET /':  {
        schema: {
            query: joi.object().keys({
                limit: joi.number().integer().min(1).max(100).default(50),
                skip: joi.number().integer().min(1).max(100).default(0)
            })
        },
        handler: function (req, res) {
            res.result(['here', 'we', 'are', req.query.limit, req.query.skip]);
        }
    }

});

service.listen();
