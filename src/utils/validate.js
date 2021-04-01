module.exports.number = (variable, variable_name) =>{

    if(typeof variable != "number"){
        throw new Error("Invalid data. "+variable_name+ " must be a number");
    }
}

module.exports.string = (variable, variable_name) =>{

    if(typeof variable != "string"){
        throw new Error("Invalid data. "+variable_name+ " must be a string");
    }
}

module.exports.datetimeString = (variable, variable_name) => {
    if(typeof variable != "string"){
        throw new Error("Invalid data. "+variable_name+ " must be a datetime string");
    }

    if(new Date(variable) == "Invalid Date"){
        throw new Error("Invalid data. "+variable_name+ " must be a valid datetime string");
    }
}

module.exports.array = (variable, variable_name, required = true) => {
    if(!Array.isArray(variable)){
        throw new Error("Invalid data. "+variable_name+ " must be a array");
    }

    if(required){
        if(variable.length <= 0){
            throw new Error("Invalid data. "+variable_name+ " is empty");
        }
    }
}

module.exports.instance = (variable, variable_name, instanceObj) => {
    if(!(variable instanceof instanceObj)){
        throw new Error("Invalid data. "+variable_name+ " must be instance of " + instanceObj.name);
    }
}

module.exports.instanceArray = (variableArray, variable_name,  instanceObj) => {
    if(!Array.isArray(variableArray)){
        throw new Error("Invalid data. "+variable_name+ " must be "+ instanceObj.name +" instance array");
    }

    for (const iterator of variableArray) {
        if(!(iterator instanceof instanceObj)){
            throw new Error("Invalid data. "+variable_name+ " must be "+ instanceObj.name +" instance array");
        }
    }
}