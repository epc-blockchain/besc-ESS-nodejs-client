var besc_client = require("../src/index");

var dateConvert = require("../src/utils/dateConvert");

var keypair = new besc_client.keyPair("project1", "abc123");

const ProjectData = besc_client.ProjectData;
const Device = besc_client.Device;
const Formula = besc_client.Formula;
const helper = besc_client.helper;

var host_client = new besc_client.Host("https://dev-api.besc.online");
//var host_client = besc_client.Host.createDefault();

//var volumetricWeightFormula = new Formula("volumetricWeight",  ["h","w","d"] );

//volumetricWeightFormula.applyFieldsValues({h: 12, w: 13, d: 15});

(async () =>{ 

    //var formulas = await helper.getAllFormulas(host_client, keypair);

    var formulas = {
        sample : new Formula("sample", ["a","b", "c"], "a * b / c")
    };

    var f1 = formulas["sample"].duplicate();

    // formula Name is not fixed
    f1.applyFieldsValues({a: 10, b: 10, c: 10});

    var projectData = new ProjectData(
        "2019-05-29T06:00:00", // UTC Timestamp
        "Testing", 
        [
            new Device(
                "AABC1", // Id
                50, // EnergyUsage
                5, // EnergySaved
                10, // Efficiency
                [f1] //formulas
            ), 
            new Device(
                "AABC2", // Id
                100, // EnergyUsage
                15, // EnergySaved
                15, // Efficiency
                [] //formulas
            ), 
        ],
        80.5, // AverageRT
        "101.1212, 112.1133" // Geolocation
    );

    var projectData2 = new ProjectData(
        "2019-05-29T06:31:00", // UTC Timestamp
        "Testing", 
        [
            new Device(
                "AABC1", // Id
                50, // EnergyUsage
                5, // EnergySaved
                10, // Efficiency
                [f1] //formulas
            ), 
            new Device(
                "AABC2", // Id
                100, // EnergyUsage
                15, // EnergySaved
                15, // Efficiency
                [] //formulas
            ), 
        ],
        80.5, // AverageRT
        "101.1212, 112.1133" // Geolocation
    );

    try{

        let batchProjectData = [
            projectData,
            projectData2
        ];

        var response = await besc_client.API.sendBatchProjectData(host_client, keypair, batchProjectData);

        console.log(response);
    }
    catch(apiError){
        // apiError.statusCode - request http status code
        // apiError.error - error message that send back from server
        console.log(apiError.error);
    }

})();
