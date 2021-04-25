import { IsolationForest } from 'isolation-forest'

export default function AnomalyDetection() {
    var isolationForest = new IsolationForest(5);
    var data = [
        {"lat":41.2565,"long":28.4513,"t":12.38},
        {"lat":38.3851,"long":27.1104,"t":14.08},
        {"lat":41.025,"long":29.048,"t":15.46},
        {"lat":37.5462,"long":45.6488,"t":11.42}
  ];
isolationForest.fit(data) // Type ObjectArray ({}[]); 

var scores = isolationForest.scores();
console.log(scores[0] +";"+scores[1]+";"+scores[2] +";"+scores[3]);
}