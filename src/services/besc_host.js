class BESC_ESS_Host{

    constructor(host){
        this.host = host;
    }

    static createDefault(){
        return new BESC_ESS_Host("https://carboapi.besc.online");
    }

    setEndPoint(endpoint){
        this.endpoint = endpoint;
    }

    setProjectId(project_id){
        this.project_id = project_id;
    }

    buildUrl(){

        var endpoint = this.endpoint.replace(":project_id", this.project_id);

        return this.host + basePath + endpoint;
    }

}

const endpoints = {
    debug: "/debugs/:project_id",
    project: "/project/:project_id",
    baseline: "/project/:project_id/baseline",
    formulas: "/project/:project_id/formulas"
};

const basePath = "/energysaving";

module.exports.default = BESC_ESS_Host;
module.exports.endpoints = endpoints;
