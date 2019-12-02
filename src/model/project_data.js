var validate = require('../utils/validate');
var dateUtil = require('../utils/dateConvert'); 
const Device = require("./device").default;
const Formula = require("./formula").default;
const crypto = require("crypto");

class ProjectData{

    /**
    * @param {string|number} datetime - DateTime in string
    * @param {string} project - Project Name
    * @param {[Device]} devices - Device object
    * @param {number} totalEnergyUsage - TotalEnergyUsage
    * @param {number} totalEnergySaved - totalEnergySaved
    * @param {number} averageRT - AverageRT
    * @param {string} geolocation - Geolocation
    */
    constructor(dateTime, project_name, devices, totalEnergyUsage, totalEnergySaved, averageRT, geolocation) {
        this.project = project_name;
        this.datetime = dateTime;
        this.devices = devices;
        this.totalEnergyUsage = totalEnergyUsage;
        this.totalEnergySaved = totalEnergySaved;
        this.averageRT = averageRT;
        this.geolocation = geolocation;

        this.validate();

        this.datetime = dateUtil.formatDateTimeString(this.datetime);
    }

    /**
    * @param {string} project - Project Name
    * @param {string} datetime - DateTime in string
    * @param {[Device]} devices - Device object
    * @param {number} totalEnergyUsage - TotalEnergyUsage
    * @param {number} totalEnergySaved - totalEnergySaved
    * @param {number} averageRT - AverageRT
    * @param {string} geolocation - Geolocation
    * @returns {ProjectData}
    */
    static createWithCurrentTime(project_name, devices, totalEnergyUsage, totalEnergySaved, averageRT, geolocation){

        var dateNow = new Date();

        // current date time as UTC format
        var currentDateTime = dateNow.toJSON();

        return new ProjectData(currentDateTime, project_name, devices, totalEnergyUsage, totalEnergySaved, averageRT, geolocation);
    }

    validate(){
        if(!(this.devices instanceof Array)){
            throw new Error("devices ID is not array");
        }
        else if(this.devices.length == 0){
            throw new Error("devices cannot be empty");
        }
        else{
            this.devices.forEach(function(item, index){
                if(!(item instanceof Device)){
                    throw new Error("Item of Devices must be instance of Device ");
                }
            });
        }

        validate.number(this.averageRT, "AverageRT");
        validate.number(this.totalEnergyUsage, "TotalEnergyUsage");
        validate.number(this.totalEnergySaved, "totalEnergySaved");
        validate.string(this.geolocation, "Geolocation");
        validate.string(this.project, "Project");
        validate.datetimeString(this.datetime, "DateTime");
    }

    serializeDevices(){

        var serialized_Devices = [];

        for(var i = 0; i < this.devices.length; i++){
            serialized_Devices.push(this.devices[i].serialize());
        }

        return serialized_Devices;
    }

    serialize(){

        var dataToSend = {
            Project: this.project,
            DateTime: this.datetime,
            Devices: this.serializeDevices(),
            TotalEnergyUsage: this.totalEnergyUsage,
            TotalEnergySaved: this.totalEnergySaved,
            AverageRT: this.averageRT,
            Geolocation: this.geolocation
        };

        return dataToSend;
    }

    getChecksum(){

        var serializedData = this.serialize();

        var hash = crypto.createHash("sha1").update(JSON.stringify(serializedData), "binary").digest("hex");

        this.checksum = hash;

        return hash;
    }

    get getDatetime(){
        return dateUtil.datetimeFromUTC(this.datetime);
    }

    set setDatetime(datetime){

        if(datetime instanceof Date){
            this.datetime = dateUtil.dateToFormat(datetime);
        }
        else if(typeof datetime === "string" ){
            this.datetime = dateUtil.dateToFormat(dateUtil.datetimeFromUTC(datetime));
        }
        else{
            throw new Error("Invalid date time format");
        }   
    }

    serializeNGetChecksum(){

        var serialized = {
            data : this.serialize(),
            checksum : this.getChecksum()
        };

        return serialized;
    }

    verifyChecksum(checksum){

        return checksum === this.checksum ? true : false;
    }

    static createProjectDataFromData(projectDataDTO){

        var devices = projectDataDTO.Devices.map((deviceInfo)=>{

            var formulas = deviceInfo.Formulas.map((formulaInfo)=>{

                var formula = new Formula(formulaInfo.FormulaName, Object.keys(formulaInfo.FieldNames));

                formula.applyFieldsValues(formulaInfo.FieldNames);

                return formula;
            });

            return new Device(deviceInfo.DeviceId, deviceInfo.EnergyUsage, deviceInfo.EnergySaved, deviceInfo.Efficiency, formulas);
        });

        return new this(projectDataDTO.DateTime, projectDataDTO.Project, devices, projectDataDTO.TotalEnergyUsage, projectDataDTO.TotalEnergySaved, projectDataDTO.AverageRT, projectDataDTO.Geolocation);
    }
}

const options = {
    limit: 5,
    offset : 0, 
    start_date: undefined,
    end_date: undefined
};

module.exports.default = ProjectData;
module.exports.options = options;
