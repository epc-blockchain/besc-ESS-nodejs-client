var besc_client = require("../src/index");

var keypair = new besc_client.keyPair("project1", "abc123");

const helper = besc_client.helper;

var host_client = new besc_client.Host("https://dev-api.besc.online");

// Or you can use the default Url
// var host_client = besc_client.Host.createDefault();

(async ()=>{
    var formulas = await helper.getAllFormulas(host_client, keypair);

    console.log(formulas);
})();
