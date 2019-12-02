/*
var math = require("mathjs");


var formula1 = "( DeviceReading * 12000/ BTU )";
var getVolumetricWeight = "( height * width * length  )";
var formula3 = "( volumetricWeight + formula1 )";

var obj = { DeviceReading: 1.11, BTU: 1000 };

var effecinecy = math.evaluate(formula1, obj);

console.log(math.round(effecinecy, 3));

const nodeFormula1 = math.parse(formula1)   // returns the root Node of an expression tree
const code = nodeFormula1.compile()        // returns {evaluate: function (scope) {...}}
const value1 = code.evaluate({DeviceReading: 1.11, BTU: 1000}) // returns 5

const value2 = code.evaluate({DeviceReading: 1.12, BTU: 1000})

console.log(math.round(value1, 3));
console.log(math.round(value2, 3));

*/

const crypto = require("crypto");

var besc_client = require("./index");

var dateConvert = require("./utils/dateConvert");

var keypair = new besc_client.keyPair("1", "abc123");

const ProjectData = besc_client.ProjectData;
const Device = besc_client.Device;
const Formula = besc_client.Formula;
const helper = besc_client.helper;

var host_client = new besc_client.Host("http://localhost:3000");
//var host_client = besc_client.Host.createDefault();

(async ()=>{
    var baseline = await helper.getBaseline(host_client, keypair);

    console.log(baseline);

    /*
    var formulasResult = await besc_client.API.getProjectFormulas(host_client, keypair);

    var formulas = {};

    for(var i = 0; i < formulasResult.length; i++){
        formulas[formulasResult[i].name] = new Formula(formulasResult[i].name, formulasResult[i].fieldNames, formulasResult[i].formula);
    }
    */

    var formulas = await helper.getAllFormulas(host_client, keypair);

    formulas["volumetricWeight"].applyFieldsValues({h: 20, w: 20, d: 20});

    var calculatedValue = formulas["volumetricWeight"].calculate();

    console.log(calculatedValue);
})();

/*
(async ()=>{

var formula1 = new Formula("volumetricWeight",  ["h","w","d"], "( h * w * d / 1000)" );

formula1.applyFieldsValues({h: 12, w: 13, d: 15});

//console.log(formula1);
//console.log(formula1.serialize());

var tmpFormula = formula1.duplicate();

console.log(tmpFormula.fieldNames);

var device = new Device("Any", 10, 4, 0.8, [tmpFormula])

formula1.applyFieldsValues({h: 13, w: 14, d: 16});

var tmpFormula2 = formula1.duplicate();

console.log(tmpFormula2.fieldNames);

var device2 = new Device("Any", 11, 4, 0.8, [tmpFormula2])
console.log(JSON.stringify(device.serialize()));
console.log(JSON.stringify(device2.serialize()));
console.log(device.getFormulaFieldNames("volumetricWeight"));
console.log(device2.getFormulaFieldNames("volumetricWeight"));

process.exit();
})();
*/
/*
var projectData = new ProjectData(
    "2019-05-29T06:00:00",
    "Testing", 
    [
        device
    ],
    110,
    30,
    80.5,
    "101.1212, 112.1133"
);
*/

/*
var projectData = ProjectData.createWithCurrentTime(
    "Testing", 
    [
        device
    ],
    110,
    30,
    80.5,
    "101.1212, 112.1133"
);
*/

/*

console.log(JSON.stringify(projectData.serializeNGetChecksum()));

var dataToObj = {
    Project: "Testing",
    DateTime: "2019-05-29T06:00:00",
    Devices: [{ 
        "DeviceId":"Any",
        "EnergyUsage":10,
        "EnergySaved":4,
        "Efficiency":0.8,
        "Formulas":[
            {
                "FormulaName":"volumetricWeight",
                "FieldNames":{
                    "h":12,
                    "w":13,
                    "d":15
                }
            }]
        }
    ],
    TotalEnergyUsage: 110,
    TotalEnergySaved: 30,
    AverageRT: 80.5,
    Geolocation: "101.1212, 112.1133"
};

var projectData2 = ProjectData.createProjectDataFromData(dataToObj);

console.log(JSON.stringify(projectData2.serializeNGetChecksum()));

console.log(projectData2.verifyChecksum("56e8e5de3ac03561c443e40615a094a49c636795"));
*/
//console.log(projectData);



//var formula = projectData2.devices[0].formulas[0];

//formula.setFormula("( h * w * d / 1000)");
//console.log(formula.calculate());
//console.log(projectData.devices[0].getFormulaFieldNames("volumetricWeight"));

//console.log(JSON.stringify(dataToSend));

//var hash = crypto.createHash("sha1").update(JSON.stringify(dataToSend), "binary").digest("hex");

//console.log(hash);
//var response = await besc_client.API.sendProjectData(host_client, keypair, projectData);

//console.log(formula1);
