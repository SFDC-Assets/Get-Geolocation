//  Javascript controller for the Get Geolocation component.
//
//  This code is provided AS IS, with no warranty or guarantee of suitability for use.
//  Contact: john.meyer@salesforce.com

import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class GetGeolocationFlowComponent extends LightningElement {
	@api latitude = '';
	@api longitude = '';
	@api zoomLevel = 10;
	@api showErrors = false;
	@api showMap = false;
	@track markers = [];

	renderedCallback() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				this.latitude = position.coords.latitude;
				this.longitude = position.coords.longitude;
				this.dispatchEvent(new FlowAttributeChangeEvent('latitude', this.latitude));
				this.dispatchEvent(new FlowAttributeChangeEvent('longitude', this.longitude));
				if (this.showMap)
					this.markers = [
						{
							location: {
								Latitude: this.latitude,
								Longitude: this.longitude
							}
						}
					];
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
}
