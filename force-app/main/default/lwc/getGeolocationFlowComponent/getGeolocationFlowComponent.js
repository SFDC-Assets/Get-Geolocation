//  Javascript controller for the Get Geolocation component.
//
//  This code is provided AS IS, with no warranty or guarantee of suitability for use.
//  Contact: john.meyer@salesforce.com

import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class GetGeolocationFlowComponent extends LightningElement {
	@api latitude = null;
	@api longitude = null;
	@api altitude = null;
	@api speed = null;
	@api heading = null;
	@api zoomLevel = 10;
	@api showErrors = false;
	@api showMap = false;
	@track markers = [];

	renderedCallback() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.success.bind(this), this.problem.bind(this), {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			});
		} else if (this.showErrors) {
			this.dispatchEvent(
				new ShowToastEvent({
					message: 'Device does not support geolocation or does not allow it for this application.',
					variant: 'error',
					mode: 'sticky'
				})
			);
		}
	}

	success(position) {
		this.latitude = position.coords.latitude;
		this.longitude = position.coords.longitude;
		this.altitude = position.coords.altitude;
		this.speed = position.coords.speed;
		this.heading = position.coords.heading === NaN ? null : position.coords.heading;
		this.dispatchEvent(new FlowAttributeChangeEvent('latitude', this.latitude));
		this.dispatchEvent(new FlowAttributeChangeEvent('longitude', this.longitude));
		this.dispatchEvent(new FlowAttributeChangeEvent('altitude', this.altitude));
		this.dispatchEvent(new FlowAttributeChangeEvent('speed', this.speed));
		this.dispatchEvent(new FlowAttributeChangeEvent('heading', this.heading));
		if (this.showMap)
			this.markers = [
				{
					location: {
						Latitude: this.latitude,
						Longitude: this.longitude
					}
				}
			];
	}

	problem(error) {
		if (this.showErrors) {
			this.dispatchEvent(
				new ShowToastEvent({
					title: 'Could not retrieve geolocation.',
					message: `Error code ${error.code}: ${error.message}`,
					variant: 'error',
					mode: 'sticky'
				})
			);
		}
	}
}
