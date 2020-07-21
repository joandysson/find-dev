const Dev = require('../models/Dev');
const parseStringToArray = require('./utils/parseStrindToArray.js')

module.exports = {
    async index(request, response){
        const {latitude, longitude, techs} = request.query;
        techsArray = parseStringToArray(techs);

        const devs = await Dev.find({
            techs:{
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                        $maxDistance: 10000,
                    }
                }
            }
        });

        return response.json({devs});
    },
};