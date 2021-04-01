const crypto = require("crypto");
const validate = require("./validate");
var project_data = require("../model/project_data").default;

module.exports.getBatchChecksum = (batchProjectData)=>{

    validate.instanceArray(batchProjectData, "Project Data Batch", project_data);

    var checksumSet = new Set();

    if(batchProjectData.length > 10){
        throw new Error("Batch of project data cannot be more that 10");
    }

    for (const projectData of batchProjectData) {
        var serializedData = projectData.serializeNGetChecksum();
        checksumSet.add(serializedData.checksum);
    }

    if(checksumSet.size !== batchProjectData.length){
        throw new Error("Please check, you are having duplicated project data");
    }

    var hash = crypto.createHash("sha1").update([...checksumSet].join(''), "binary").digest("hex");

    return hash;
}