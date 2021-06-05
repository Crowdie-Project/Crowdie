import { IsolationForest } from 'isolation-forest'
import { Component } from 'react';

//TODO: EVENTUALLY REPLACE!
const repCodes = [1201, 1202, 1203, 1204, 1301, 1302, 1303, 1304, 1401, 1402, 1403, 1501, 1502, 1503, 1504, 1601, 1602, 1603, 1701, 1702, 1703, 1801, 1802, 1803, 3101, 3201,3202,3203, 3301, 3302, 3303, 11201, 11202, 11203, 11204, 11301, 11302, 11303, 11304, 11401, 11402, 11403, 11503, 11504, 11505, 11601, 11602, 11603, 11701, 11702, 11703, 11801, 11802, 11803, 2200, 2300, 2400, 2500, 2601, 2602, 2700, 2801, 2802, 12200, 12300, 12400, 12500, 12601, 12602, 12700, 12801, 12802, 13101, 13201, 13202, 13203, 13301, 13302, 13303];

export default function AnomalyDetection(data) {
  
 /*  var data = [
    {"CODE": 1201, "ID": 12931283, "lat":41.080386328434905,"long":28.99703979492188,"t":2021-04-24T14:01:44+00:00},
    {"CODE": 1202, "ID": 12937283, "lat":41.076633727112515,"long":28.997554779052738,"t":2021-04-24T14:02:33+00:00},
    {"CODE": 1203, "ID": 15587283, "lat":41.077539547047294,"long":29.003305435180668,"t":2021-04-24T14:02:45+00:00},
    {"CODE": 1301, "ID": 99587283, "lat":41.079415848632,"long":28.988885879516605,"t":2021-04-24T14:02:47+00:00},
    {"CODE": 1203, "ID": 15577283, "lat":41.076180812464166,"long":28.986911773681644,"t":2021-04-24T14:02:14+00:00},
    {"CODE": 1203, "ID": 82931283, "lat":41.08261837760025,"long":28.985624313354492,"t":2021-04-24T14:02:45+00:00},
    {"CODE": 1302, "ID": 92931283, "lat":41.08491504471011,"long":28.96030426025391,"t":2021-04-24T14:02:54+00:00},
    {"CODE": 1301, "ID": 72931283, "lat":41.072880911548936,"long":28.961849212646488,"t":2021-04-24T14:02:34+00:00},        
    {"CODE": 1301, "ID": 12935553, "lat":41.05955021422251,"long":28.975582122802738,"t":2021-04-24T14:04:44+00:00},
    {"CODE": 1202, "ID": 20931283, "lat":41.0607151401866,"long":28.99703979492188,"t":2021-04-24T14:03:44+00:00},
    {"CODE": 1201, "ID": 57141283, "lat":41.09617078744703,"long":28.99154663085938,"t":2021-04-24T14:03:54+00:00},
    {"CODE": 1301, "ID": 88931283, "lat":41.10225067378896,"long":28.978843688964847,"t":2021-04-24T14:02:42+00:00},        
    {"CODE": 1301, "ID": 77931283, "lat":41.08297420451945,"long":28.9735221862793,"t":2021-04-24T14:02:41+00:00},
    {"CODE": 1201, "ID": 89931283, "lat":41.08349176750823,"long":28.96905899047852,"t":2021-04-24T14:02:47+00:00},
    {"CODE": 1203, "ID": 12931284, "lat":41.0343050853874,"long":28.982620239257816,"t":2021-04-24T14:03:16+00:00},
    {"CODE": 1201, "ID": 11131283, "lat":41.06175061261111,"long":29.064502716064457,"t":2021-04-24T14:05:18+00:00},        
    {"CODE": 1201, "ID": 11111183, "lat":41.027959915023665,"long":29.02622222900391,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1201, "ID": 12588753, "lat":41.06615118853871,"long":28.989143371582035,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1201, "ID": 57478675, "lat":41.05851470715539,"long":28.979701995849613,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1201, "ID": 12745253, "lat":41.08271542149653,"long":28.979358673095707,"t":2021-04-24T14:02:44+00:00},        
    {"CODE": 1201, "ID": 45763788, "lat":41.08103330700923,"long":28.975410461425785,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1301, "ID": 23754765, "lat":41.086985211067336,"long":28.962707519531254,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1201, "ID": 78697333, "lat":41.074433826731486,"long":28.960990905761722,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1201, "ID": 33337427, "lat":41.069127881747995,"long":28.965625762939457,"t":2021-04-24T14:02:44+00:00},        
    {"CODE": 1503, "ID": 17876899, "lat":41.07650432324571,"long":28.96854400634766,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1201, "ID": 74578973, "lat":41.07508086389766,"long":28.960647583007816,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1201, "ID": 36578523, "lat":41.06420979428149,"long":28.958244323730472,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1301, "ID": 12786578, "lat":41.07805715283417,"long":29.00047302246094,"t":2021-04-24T14:02:44+00:00},        
    {"CODE": 1201, "ID": 35711447, "lat":41.067574841233906,"long":28.987426757812504,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1201, "ID": 27586667, "lat":41.05333692728665,"long":28.997383117675785,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1201, "ID": 90427678, "lat":41.05333692728665,"long":28.997383117675785,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1201, "ID": 97462217, "lat":41.048417658920364,"long":28.951721191406254,"t":2021-04-24T14:02:44+00:00},        
    {"CODE": 1201, "ID": 55724371, "lat":41.075210270566636,"long":28.971977233886722,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1201, "ID": 12212113, "lat":41.07068088558002,"long":28.975582122802738,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1202, "ID": 32455542, "lat":41.062786068733026,"long":28.98897171020508,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1201, "ID": 99754233, "lat":41.0587735854505,"long":28.99068832397461,"t":2021-04-24T14:02:44+00:00},        
    {"CODE": 1201, "ID": 88889634, "lat":41.08763212467916,"long":28.97729873657227,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1301, "ID": 47527272, "lat":41.09345406057922,"long":28.97180557250977,"t":2021-04-24T14:02:44+00:00}, 
    {"CODE": 1301, "ID": 21424278, "lat":41.19345406057922,"long":28.57180557250977,"t":2021-04-24T14:02:44+00:00},       
    {"CODE": 1301, "ID": 88877425, "lat":40.85345406047822,"long":27.99180787250977,"t":2021-04-24T14:02:44+00:00},
    {"CODE": 1301, "ID": 77844237, "lat":40.99341406047111,"long":27.99180787257864,"t":2021-04-24T14:02:44+00:00}, 
  ];
   */
    let normalReps = [];
    let codesHM = createCodesHMap(data);

    console.log(repCodes);
    
    Array.from(repCodes).forEach((code) => {
  
    //list of objects where objects are {"lat":number, "long":number, "t":number}
    var formattedReps = codesHM[code].map((report) =>{
      var container = {};
      container["Lat"] = report.LAT;              //Change "lat" to "LAT"
      container["Long"] = report.LON;            //Change "long" to "LON"
      container["t"] = convertUnixTime(report.TIME); //Change "t" to "TIME"
      return container;
    });
    
  
      if(formattedReps.length < 1){
        console.log("Not enough reports.\n");
    
      }else if(formattedReps.length < 100){
        var isolationForest = new IsolationForest(10);
      
        isolationForest.fit(formattedReps) // Type ObjectArray ({}[]); 
      
        var scores = isolationForest.scores();
    
        for(var i = 0; i < scores.length; i++) {
          if(scores[i] < 0.5){
            //console.log("Report:" + normalReps[i] + " Score: " + scores[i] +"\n");
            normalReps.push((codesHM[code])[i]);
          }
        }
    
      }else{
        var isolationForest = new IsolationForest(100);
        
        isolationForest.fit(formattedReps) // Type ObjectArray ({}[]); 
      
        var scores = isolationForest.scores();
    
        for(var i = 0; i < scores.length; i++) {
          if(scores[i] < 0.5){
          //console.log("Report:" + normalReps[i] + " Score: " + scores[i] +"\n");
          normalReps.push((codesHM[code])[i]);
          }
        }
      }
    });
  

    //console.log("All the Reps: ");
    //console.log(codesHM);
  
    //console.log("Normal Reps: ");
    //console.log(normalReps);


  

  return normalReps;
}

function convertUnixTime(timestamptz) {
  var t = timestamptz.indexOf("T")
  var date = timestamptz.substring(0,t+9)+"Z"
  var d = new Date(date);
  var myEpoch = d.getTime()/1000;
  //console.log(date)
  //console.log(myEpoch)
  return myEpoch;
};


//put reports in 'data' to a hash table with keys as their codes.
function createCodesHMap(data) {
  var codesHM = {};

  Array.from(repCodes).forEach((code) => {
    codesHM[code] = [];
  });

  Array.from(data).forEach((report) => {
    var tempArr = codesHM[report.CODE];
    //console.log("LET'S SEE");
    //console.log(report.CODE);
    //console.log(tempArr);
    //console.log(codesHM);
    tempArr.push(report);   
    //console.log(report);
    //console.log(tempArr);

    codesHM[report.CODE] = tempArr;
  });

  //console.log("FINAL");
  //console.log(codesHM);
  return codesHM;

};