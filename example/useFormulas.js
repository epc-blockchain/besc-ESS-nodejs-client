var besc_client = require("../src/index");

var keypair = new besc_client.keyPair("project1", "abc123");

const helper = besc_client.helper;

var host_client = new besc_client.Host("http://localhost:3000");

// Or you can use the default Url
// var host_client = besc_client.Host.createDefault();

(async ()=>{
    var formulas = await helper.getAllFormulas(host_client, keypair);

    // now you can use the formula you get from the besc data api
    // in this example, the formula name is : volumetricWeight
    formulas["volumetricWeight"].applyFieldsValues({h: 20, w: 20, d: 20});

    var calculatedValue = formulas["volumetricWeight"].calculate();

    // the formula is h * w * d /1000
    // it should return 8
    console.log(calculatedValue);

    // to duplicate another instances for it to have different fieldValue
    var volumetricWeightDuplicate = formulas["volumetricWeight"].duplicate();

    volumetricWeightDuplicate.applyFieldsValues({h: 10, w: 10, d: 10});

    var calculatedValue2 = volumetricWeightDuplicate.calculate();

    // it should return 1
    console.log(calculatedValue2);

    calculatedValue = formulas["volumetricWeight"].calculate();

    // it will still be 8, as the value of h, w and d is 20
    console.log(calculatedValue);
})();