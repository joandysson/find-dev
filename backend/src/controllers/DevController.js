const axios    = require('axios');
const Dev      = require('../models/Dev');
const parseStringToArray = require('./utils/parseStrindToArray');

module.exports = {
    async index (request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store (request, response) {
        const {github_username, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({github_username});

        if(dev) {
            return response.json({"message": "Usuário já se encontra cadastrado"});
        }

        const response_axios = await axios.get(`http://api.github.com/users/${github_username}`);
        let {name = login, avatar_url, bio } = response_axios.data;
        const techsArray = parseStringToArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        dev =  await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        });
        return  response.json(dev);
    },

    async show(){

    },

    async update(id){

    },

    async destroy(id){

    },
};