// ble.js - Web Bluetooth GATT Logic
const SERVICE_UUID = '0000feaf-0000-1000-8000-00805f9b34fb'; // Custom Chat UUID
const CHAR_UUID = '0000feaf-0001-1000-8000-00805f9b34fb';

export const BLEManager = {
  device: null,
  characteristic: null,

  async connect() {
    this.device = await navigator.bluetooth.requestDevice({
      filters: [{ services: [SERVICE_UUID] }]
    });
    const server = await this.device.gatt.connect();
    const service = await server.getPrimaryService(SERVICE_UUID);
    this.characteristic = await service.getCharacteristic(CHAR_UUID);
    
    // Start listening for notifications (incoming messages)
    await this.characteristic.startNotifications();
    return this.characteristic;
  },

  async sendMessage(data) {
    if (!this.characteristic) throw new Error("Not connected");
    const encoder = new TextEncoder();
    return await this.characteristic.writeValue(encoder.encode(data));
  }
};