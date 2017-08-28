'use strict';

var TodosError = require('maf-error').create('TodosError', {
    // for example
    EMPTY_RESULT: 'empty result'
});

//  curl -sv "http://localhost:3000?limit=1"
//  curl -sv "http://localhost:3000?limit=5&skip=5"
//  curl -sv "http://localhost:3000?limit=10&skip=200"

class TodosApi {

    constructor () {
        this.Error = TodosError;

        var todos = [];

        for (var i = 0; i < 100; i++) {
            todos.push({
                id: i,
                name: String(i).repeat(10)
            });
        }

        this._todos = todos;
    }

    find (limit, skip) {
        return new Promise((resolve, reject) => {
            var result = this._todos.slice(skip, skip + limit);

            if (result.length === 0) {
                reject(new this.Error(this.Error.CODES.EMPTY_RESULT));
            }

            resolve(result);
        });

    }

}


var service = require('@maf/rest-service')('myservice');

var joi = service.joi;

// init di
var di = {
    api: {
        todos: new TodosApi()
    }
};

service.setDi(di);

service.addMethods({
    'GET /':  {
        schema: {
            query: joi.object().keys({
                limit: joi.number().integer().min(1).max(100).default(50),
                skip: joi.number().integer().min(1).max(500).default(0)
            })
        },
        handler: async function (req, res) {

            var todosApi = req.di.api.todos;

            try {

                var result = await todosApi.find(req.query.limit, req.query.skip);
                res.result(result);

            } catch (error) {
                error.getCheckChain()
                    .if(todosApi.Error, {
                        [todosApi.Error.CODES.EMPTY_RESULT]: res.badRequest
                    })
                    .else(res.serverError)
                    .check();
            }

        }
    }

});

service.listen();
