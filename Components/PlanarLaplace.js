/*
Location Guard (available at https://github.com/chatziko/location-guard)

Copyright © 2013-2019 Konstantinos Chatzikokolakis, Marco Stronati and others 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// The following code has been minimally modified from the original `laplace.js`,
// converted to a React Component and adjusted for scoping. 

// Planar Laplace mechanism, based on Marco's demo
//
// This class just implements the mechanism, does no budget management or
// selection of epsilon
//

import React, { Component } from 'react';

class PlanarLaplace extends Component {
	
	constructor(){
		super();
		this.earth_radius = 6378137; //const, in meters
	}

	// convert an angle in radians to degrees and viceversa
	rad_of_deg(ang){
		return ang * Math.PI / 180;
	}
	rad_of_deg(ang){
		return ang * 180 / Math.PI;
	}

	// Mercator projection 
	// https://wiki.openstreetmap.org/wiki/Mercator
	// https://en.wikipedia.org/wiki/Mercator_projection
	
	//getLatLon and getCartesianPosition are inverse functions
	//They are used to transfer { x: ..., y: ... } and { latitude: ..., longitude: ... } into one another
	getLatLon(cart){
		var rLon = cart.x / PlanarLaplace.earth_radius;
		var rLat = 2 * (Math.atan(Math.exp(cart.y / PlanarLaplace.earth_radius))) - Math.PI/2;
		//convert to degrees
		return {
			latitude: this.deg_of_rad(rLat),
			longitude: this.deg_of_rad(rLon)
		};
	}

	getCartesian(ll){
		// latitude and longitude are converted in radiants
		return {
			x: PlanarLaplace.earth_radius * this.rad_of_deg(ll.longitude),
			y: PlanarLaplace.earth_radius * Math.log( Math.tan(Math.PI / 4 + this.rad_of_deg(ll.latitude) / 2))
		};
	}

	// LamberW function on branch -1 (http://en.wikipedia.org/wiki/Lambert_W_function)
	LambertW(x){
		//min_diff decides when the while loop should stop
		var min_diff = 1e-10;
		if (x == -1/Math.E){
			return -1;
		}

		else if (x<0 && x>-1/Math.E) {
			var q = Math.log(-x);
			var p = 1;
			while (Math.abs(p-q) > min_diff) {
				p=(q*q+x/Math.exp(q))/(q+1);
				q=(p*p+x/Math.exp(p))/(p+1);
			}
			//This line decides the precision of the float number that would be returned
			return (Math.round(1000000*q)/1000000);
		}
		else if (x==0) {return 0;}
		//TODO why do you need this if branch? 
		else{
			return 0;
		}
	}

	// This is the inverse cumulative polar laplacian distribution function. 
	inverseCumulativeGamma(epsilon,z){
		var x = (z-1) / Math.E;
		return - (this.LambertW(x) + 1) / epsilon;
	}

	// returns alpha such that the noisy pos is within alpha from the real pos with
	// probability at least delta
	// (comes directly from the inverse cumulative of the gamma distribution)
	//
	alphaDeltaAccuracy(epsilon,delta){
		return this.inverseCumulativeGamma(epsilon, delta);
	}


	// returns the average distance between the real and the noisy pos
	//
	expectedError(epsilon){
		return 2 / epsilon;
	}

	addPolarNoise(epsilon,pos){
		//random number in [0, 2*PI)
		var theta = Math.random() * Math.PI * 2;
		//random variable in [0,1)
		var z = Math.random();
		var r = this.inverseCumulativeGamma(epsilon, z);

		return this.addVectorToPos(pos, r, theta);
	}

	addPolarNoiseCartesian(epsilon,pos){
		if('latitude' in pos)
			pos = this.getCartesian(pos);

		//random number in [0, 2*PI)
		var theta = Math.random() * Math.PI * 2;
		//random variable in [0,1)
		var z = Math.random();
		var r = this.inverseCumulativeGamma(epsilon, z);

		return this.getLatLon({
			x: pos.x + r * Math.cos(theta),
			y: pos.y + r * Math.sin(theta)
		});
	}

	// http://www.movable-type.co.uk/scripts/latlong.html
	addVectorToPos(pos,distance,angle){
		var ang_distance = distance / PlanarLaplace.earth_radius;
		var lat1 = this.rad_of_deg(pos.latitude);
		var lon1 = this.rad_of_deg(pos.longitude);

		var	lat2 =	Math.asin(
						Math.sin(lat1) * Math.cos(ang_distance) + 
						Math.cos(lat1) * Math.sin(ang_distance) * Math.cos(angle)
				  	);
		var lon2 =	lon1 +
				   	Math.atan2(
						Math.sin(angle) * Math.sin(ang_distance) * Math.cos(lat1), 
						Math.cos(ang_distance) - Math.sin(lat1) * Math.sin(lat2)
					);
		lon2 = (lon2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI;		// normalise to -180..+180
		return { 
			latitude: this.deg_of_rad(lat2),
			longitude: this.deg_of_rad(lon2)
		};
	}

	//This function generates the position of a point with Laplacian noise
	//
	addNoise(epsilon,pos){
		// TODO: use latlon.js
		return this.addPolarNoise(epsilon, pos);
	}

}

export default PlanarLaplace;
