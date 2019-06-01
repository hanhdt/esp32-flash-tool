const SerialPort = require('serialport')

export default function scanSerialPorts (mainWindow) {
  SerialPort.list((err, ports) => {
    if (err) {
      mainWindow.webContents.send('ports-scanned', null)
      return
    }

    let validPorts = ports.filter((port) => {
      return port.manufacturer === 'FTDI' || port.manufacturer === 'Silicon Labs'
    })
    mainWindow.webContents.send('ports-scanned', validPorts)
  })
}
