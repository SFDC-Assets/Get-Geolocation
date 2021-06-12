//  Javascript controller for the Get Geolocation custom property editor.
//
//  This code is provided AS IS, with no warranty or guarantee of suitability for use.
//  Contact: john.meyer@salesforce.com

import { LightningElement, api } from 'lwc';

const DEFAULT_ZOOM_LEVEL = 10;

export default class GetGeolocationFlowComponentCustomPropertyEditor extends LightningElement {
	@api inputVariables;

	get showErrors() {
		const param = this.inputVariables.find(({ name }) => name === 'showErrors');
		return param ? param.value === '$GlobalConstant.True' : false;
	}
	set showErrors(value) {
		this.doChange('showErrors', 'Boolean', value ? '$GlobalConstant.True' : '$GlobalConstant.False');
	}

	get showMap() {
		const param = this.inputVariables.find(({ name }) => name === 'showMap');
		return param ? param.value === '$GlobalConstant.True' : false;
	}
	set showMap(value) {
		this.doChange('showMap', 'Boolean', value ? '$GlobalConstant.True' : '$GlobalConstant.False');
	}

	get zoomLevel() {
		const param = this.inputVariables.find(({ name }) => name === 'zoomLevel');
		return param ? param.value : DEFAULT_ZOOM_LEVEL;
	}
	set zoomLevel(value) {
		this.doChange('zoomLevel', 'Number', value);
	}

	handleErrorCheckbox(event) {
		this.showErrors = event.detail.checked;
	}

	handleShowMapCheckbox(event) {
		this.showMap = event.detail.checked;
	}

	handleZoomLevel(event) {
		this.zoomLevel = event.detail.value;
	}

	doChange(name, type, newValue) {
		this.dispatchEvent(
			new CustomEvent('configuration_editor_input_value_changed', {
				bubbles: true,
				cancelable: false,
				composed: true,
				detail: {
					name: name,
					newValue: newValue,
					newValueDataType: type
				}
			})
		);
	}
}
