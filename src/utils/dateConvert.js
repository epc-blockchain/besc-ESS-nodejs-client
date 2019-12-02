module.exports.localtoUTCFormat = (datetime) => {
    var datetime_str = new Date(datetime).toISOString();
    var datetime_split = datetime_str.split(".");

    return datetime_split[0];
}

module.exports.dateToFormat = (dateObj) => {
    try{
        var datetime_str = dateObj.toISOString();
        var datetime_split = datetime_str.split(".");

        return datetime_split[0];
    }
    catch(err){
        throw new Error("Argument passed in must be instance of Date object");
    }
}

module.exports.datetimeFromUTC = (datetime) => {
    var datetimeUTC = new Date(this.addUTCTimeZone(datetime));

    return datetimeUTC;
}

module.exports.addUTCTimeZone = (datetime) => {
    return datetime +".000Z";
}

module.exports.formatDateTimeString = (datetime) => {
    var datetime_split = datetime.split(".");

    return datetime_split[0];
}
