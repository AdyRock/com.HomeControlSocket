'use strict';

const Homey = require('homey');
const { ZigBeeDevice, ZigBeeDriver } = require('homey-zigbeedriver');
// const { ZigBeeDevice } = require('homey-meshdriver');
const { CLUSTER, } = require('zigbee-clusters');

class RootDevice extends ZigBeeDevice {

	onNodeInit() {
		// Register capabilities
		this.registerCapability('onoff', CLUSTER.ON_OFF, { endpoint: 1 });
		this.registerCapability('measure_temperature', CLUSTER.TEMPERATURE_MEASUREMENT, { 
			endpoint: 1,
			getOpts: {
				getOnStart: true,
				getOnOnline: true,
				pollInterval: 10000, // in ms
			}
		});

		let temperatureCondition = this.homey.flow.getConditionCard('temp_above');
		temperatureCondition.registerRunListener(async (args, state) => {
			return state.value > args.value;
		});
	}
}
module.exports = RootDevice;
