# besc-ESS-nodejs-client

Please install all dependency first :
```
npm install
```

All working examples is inside the example folder

**v1.0.1**

**Added checksum feature**

For those who are not using this client, need to add in few header for it. Data send to ESS API need to be in json format as below and in orders :
```js
{
    "Project" : "",
    "DateTime" : "2019-05-23T06:00:00",
    "Devices": [ 
        { 
            "DeviceId": "AC11", 
            "EnergyUsage": 50,
            "EnergySaved": 5,
            "Efficiency": 10,
            "Formulas": []
        },
        {
            "DeviceId": "AC22", 
            "EnergyUsage": 50,
            "EnergySaved": 5,
            "Efficiency": 12,
            "Formulas": []
        }
    ], 
    "TotalEnergyUsage": 100.0, 
    "TotalEnergySaved": 10,
    "AverageRT": 88.0, 
    "Geolocation": "101.1212, 112.1133"
}
```

## Header

Content-Type
- application/json

**apikey**
- the apikey string that get from BESC

**checksum**
- need to be added in header
- sha1 string of the whole json data
- JSON.stringify(object)

As example for checksum,
```js
var object = {
    Project : "",
    DateTime : "2019-05-23T06:00:00",
    Devices: [ 
        { 
            DeviceId: "AC11", 
            EnergyUsage: 50.0 ,
            EnergySaved: 5,
            Efficiency: 10,
            Formulas: []
        },
        {
            DeviceId: "AC22", 
            EnergyUsage: 50.0 ,
            EnergySaved: 5,
            Efficiency: 12,
            Formulas: []
        }
    ], 
    TotalEnergyUsage: 100.0,
    TotalEnergySaved: 10, 
    AverageRT: 88.0, 
    Geolocation: "101.1212, 112.1133"
};

var checksum = sha1( JSON.stringify(object) );

```
Then send the object as JSON to the ESS API.

## Sending batch project data

Please use the code below to send in batch, the checksum will auto generate 

```js
    var formulas = {
        sample : new Formula("sample", ["a","b", "c"], "a * b / c")
    };

    var f1 = formulas["sample"].duplicate();

    // formula Name is not fixed
    f1.applyFieldsValues({a: 10, b: 10, c: 10});

    // to duplicate a formula instance
    //var f2 = formulas["sample"].duplicate();

    // you can create Project data  with current time with
    // ProjectData.creatWithCurrentTime

    var projectData = new ProjectData(
        "2019-05-29T06:00:00", // UTC Timestamp
        "Testing", 
        [
            new Device(
                "AABC1", // Id
                50, // EnergyUsage
                5, // EnergySaved
                10, // Efficiency
                [f1] //formulas
            ), 
            new Device(
                "AABC2", // Id
                100, // EnergyUsage
                15, // EnergySaved
                15, // Efficiency
                [] //formulas
            ), 
        ],
        80.5, // AverageRT
        "101.1212, 112.1133" // Geolocation
    );

    var projectData2 = new ProjectData(
        "2019-05-29T06:31:00", // UTC Timestamp
        "Testing", 
        [
            new Device(
                "AABC1", // Id
                50, // EnergyUsage
                5, // EnergySaved
                10, // Efficiency
                [f1] //formulas
            ), 
            new Device(
                "AABC2", // Id
                100, // EnergyUsage
                15, // EnergySaved
                15, // Efficiency
                [] //formulas
            ), 
        ],
        80.5, // AverageRT
        "101.1212, 112.1133" // Geolocation
    );

let batchProjectData = [projectData, projectData2];

var response = await besc_client.API.sendBatchProjectData(host_client, keypair, batchProjectData);

```
