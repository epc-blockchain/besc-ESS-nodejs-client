var validate = require('../utils/validate');
var math = require("mathjs");

class Formula{

    constructor(name, keys, formula = ""){
        this.name = name;
        this.keys = keys;
        this.validate();
        this.fieldNames = this.generateFields();

        if(formula){
            this.setFormula(formula);
        }
    }

    setFormula(formula){
        this.formula = formula;
        this.nodeFormula = math.parse(formula);   // returns the root Node of an expression tree
        this.code = this.nodeFormula.compile();    // returns {evaluate: function (scope) {...}}     
    }

    generateFields(){

        var fieldNames = {};

        for(var i =0; i < this.keys.length; i++){
            fieldNames[this.keys[i]] = 0;
        }

        return fieldNames;
    }

    applyFieldsValues(data){

        for (var property in data) {

            if (this.fieldNames.hasOwnProperty(property)) {
              
                this.fieldNames[property] = data[property];
            }
        }
    }

    duplicate(){
        var clone = new Formula(this.name, this.keys, this.formula);
        clone.applyFieldsValues(this.fieldNames);

        return clone;
    }

    calculate(){
        
        if(this.formula === null || this.formula === undefined){
          throw new Error("Cannot calculate, formula is not set, please set with setFormula() method");  
        }

        var calculatedAmt = this.code.evaluate(this.fieldNames) // returns 5

        return calculatedAmt;
    }

    serialize(){

        return {
            FormulaName : this.name,
            FieldNames : this.fieldNames
        };
    }

    validate(){

        if(this.formula){
            validate.string(this.formula, "Formula");
        }

        validate.string(this.name, "Name");
        validate.array(this.keys, "Variable Keys");
    }
}

module.exports.default = Formula;