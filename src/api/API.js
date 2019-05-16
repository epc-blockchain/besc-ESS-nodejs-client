var rp = require('request-promise-native');
const qS = require('query-string');
const besc_host = require("../services/besc_host");

module.exports.getLastData = (client, keyPair ) =>{

    client.setProjectId(keyPair.projectId);
    client.setEndPoint(besc_host.endpoints.debug);

    var extraPath = "/last";

    var options = {
        uri: client.buildUrl() + extraPath,
        headers:{
            'apikey': keyPair.apiKey,
            'Content-Type': 'application/json'
        },
        json: true
    };

    return new Promise(function(resolve, reject){
        rp(options)
            .then(function(parsedBody){
                resolve(parsedBody);
            }).catch(function(err){
                reject(err);
            });
    });
}

module.exports.getProjectData = (client, keyPair, queryOptions) =>{

    client.setProjectId(keyPair.projectId);
    client.setEndPoint(besc_host.endpoints.project);

    var queryString = qS.stringify(queryOptions);

    var options = {
        uri: client.buildUrl() + (queryString ? "?" + queryString : "" ),
        headers:{
            'apikey': keyPair.apiKey,
            'Content-Type': 'application/json'
        },
        json: true
    };

    return new Promise(function(resolve, reject){
        rp(options)
            .then(function(parsedBody){
                resolve(parsedBody);
            }).catch(function(err){
                reject(err);
            });
    });
}

module.exports.sendProjectData = (client, keyPair, projectData) =>{

    client.setProjectId(keyPair.projectId);
    client.setEndPoint(besc_host.endpoints.project);

    var options = {
        method: "POST",
        uri: client.buildUrl(),
        headers:{
            'apikey': keyPair.apiKey,
            'Content-Type': 'application/json'
        },
        body: projectData.serialize(),
        json: true
    };

    return new Promise(function(resolve, reject){
        rp(options)
            .then(function(parsedBody){
                resolve(parsedBody);
            }).catch(function(err){
                reject(err);
            });
    });
}