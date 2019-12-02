var validate = require('../utils/validate');
const Formula = require("./formula").default;

class Device{

    constructor(deviceID, energyUsage, energySaved, efficiency, formulas){
        this.deviceID = deviceID;
        this.energyUsage = energyUsage;
        this.energySaved = energySaved;
        this.efficiency = efficiency;
        this.formulas = formulas;

        this.validate();
    }

    serializeFormulas(){

        var formulasArray = [];

        for(var i =0; i < this.formulas.length; i++){
            formulasArray.push(this.formulas[i].serialize());
        }

        return formulasArray;
    }

    serialize(){
        return {
            DeviceId: this.deviceID,
            EnergyUsage: this.energyUsage,
            EnergySaved: this.energySaved,
            Efficiency : this.efficiency,
            Formulas: this.serializeFormulas()
        };
    }

    validate(){
        if(!(this.formulas instanceof Array)){
            throw new Error("Formulas is not array");
        }
        else{
            this.formulas.forEach(function(item, index){
                if(!(item instanceof Formula)){
                    throw new Error("Item of Formulas must be instance of Formula ");
                }
            });
        }

        validate.string(this.deviceID, "DeviceId");
        validate.number(this.energyUsage, "EnergyUsage");
        validate.number(this.energySaved, "EnergySaved");
        validate.number(this.efficiency, "Efficiency");
    }

    getFormulaFieldNames(formulaName){

        var formula = this.formulas.find((formulaInfo)=>{

            return formulaInfo.name === formulaName;
        }, {formulaName : formulaName});

        return formula.fieldNames;
    }
}

module.exports.default = Device;