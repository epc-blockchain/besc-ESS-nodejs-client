
var API = require('../api/API');
var Formula = require("../model/formula").default;

module.exports.getAllFormulas = async (host, keypair)=>{

    var formulasResult = await API.getProjectFormulas(host, keypair);

    var formulas = {};

    for(var i = 0; i < formulasResult.length; i++){
        formulas[formulasResult[i].name] = new Formula(formulasResult[i].name, formulasResult[i].fieldNames, formulasResult[i].formula);
    }

    return formulas;
}

module.exports.getBaseline = async (host, keypair)=>{

    var baselineResult = await API.getProjectBaseline(host, keypair);

    return baselineResult.baseline;
}