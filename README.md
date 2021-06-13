![Creative Commons License](https://img.shields.io/badge/license-Creative%20Commons-success) ![In Development](https://img.shields.io/badge/status-Released-success)

<h1 align="center">GET GEOLOCATION</h1>
<p align="center">
This package contains a Lightning component that gets a device's geolocation and returns it to a flow.
</p>

## Summary

This Lightning Web Component is intended to be a (mostly) silent component that you can drag onto a flow screen and retrieve the device's current geolocation. The latitude and longitude coordinates are returned in a pair of variables that can be used by the flow.

## Installation and Setup

Read the disclaimer below and click on the **Install the Package** link. This will install the component to your org.

![Installation](/images/Installation.png)

If you are a Salesforce employee installing in an SDO, CDO, or IDO, you probably want to make sure that you select the button under the "Advanced" twisty to compile only the Apex in the package (although there is no Apex in the package).

The component is meant to be a minimalist mechanism for returning the latitude and longitude of the device's location to a Salesforce screen flow. To add the component to a flow, look for it in the **Custom** section of the Flow Builder. Simply drag it onto the screen and configure it.

![Installation and Setup](/images/GeolocationFlowComponent.png)

There are three options you can configure for additional capability:

- **Show an error if no geolocation is available**: Check this if you wish an error toast to appear if the device does not support geolocation. Note that you might have to approve geolocation for the device or the application to avoid errors.
- **Show a map with the geolocation**: Check this if you want the component to display a Google map with the device's location.
- **Initial zoom level**: Choose an initial zoom level for the map, if selected.

The component will return two variables, `latitude` and `longitude`, as output variables to the flow. They will contain the latitude and longitude, respectively, of the device's location expressed as decimal numbers (not degrees, minutes, and seconds).  If you use the default variables from the component's API name, `{!API_Name.latitude}` and `{!API_Name.longitude}`, you may get truncation of the decimal portion of the returned values. In order to prevent this, declare a pair of `Number` variables in the flow, one for latitude and one for longitude, with a precision of 7 decimal places to hold the returned geolocation:

![Variables](/images/Variables.png)

There is an example flow called `Example Flow for Get Geolocation LWC` included in the package that you can use as a template. Make sure that you make a copy before you make changes to it as it will be overwritten the next time you upgrade the package.

## How to Deploy This Package to Your Org

I am a pre-sales Solutions Engineer for [Salesforce](https://www.salesforce.com) and I develop solutions for my customers to demonstrate the capabilities of the amazing Salesforce platform. _This package represents functionality that I have used for demonstration purposes and the content herein is definitely not ready for actual production use; specifically, it has not been tested extensively nor has it been written with security and access controls in mind. By installing this package, you assume all risk for any consequences and agree not to hold me or my company liable._ If you are OK with that ...

[Install the Package](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t2E000003od1IQAQ)

## Maintainer

[John Meyer / johnsfdemo](https://github.com/johnsfdemo)

**Current Version**: 1.0.2
