const {Router} = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index); // Get all devs
routes.post('/devs', DevController.store); // Create Devs
routes.get('/search', SearchController.index); // Find devs

routes.delete('/devs/:id', (request, response) => {
    console.log(request.params);
    return response.json({message: 'Hello ' + request.params.id});
})


module.exports = routes;
