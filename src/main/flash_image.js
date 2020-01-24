import { PythonShell } from 'python-shell'
import { app } from 'electron'
import path from 'path'
const uuidv4 = require('uuid/v4')

export default function spiFlashImage (mainWindow, params) {
  let espToolPath = ''
  if (process.env.NODE_ENV === 'production') {
    espToolPath = path.join(app.getAppPath(), 'dist/electron/static/esptool/').replace('app.asar', 'app.asar.unpacked')
  } else {
    espToolPath = path.join(__static, 'esptool/')
  }

  const options = {
    mode: 'text',
    pythonPath: 'python',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: espToolPath,
    args: [
      '--chip', params.chip,
      '--port', params.port,
      '--baud', params.baudRate,
      '--before', params.before,
      '--after', params.after,
      'write_flash', params.compress,
      '--flash_mode', params.flashMode,
      '--flash_freq', params.flashFreq,
      '--flash_size', params.flashSize,
      params.initialOTAIndex, params.initialOTADataBin,
      params.bootloaderIndex, params.bootloaderBin,
      params.partitionsTableIndex, params.partitionsBin,
      params.factorySerialIndex, params.factorySerialBin,
      params.appIndex, params.appBin
    ]
  }

  const pyShell = new PythonShell('esptool.py', options)

  pyShell.on('message', (message) => {
    const messageArray = message.split('\r')
    messageArray.forEach((messageItem) => {
      const msg = { id: uuidv4(), data: messageItem }
      mainWindow.webContents.send('flashing-progress-updated', msg)
    })
  })

  pyShell.end((err, code, signal) => {
    if (err) {
      mainWindow.webContents.send('flashing-progress-completed', 1, null)
      throw err
    }
    mainWindow.webContents.send('flashing-progress-completed', code, signal)
  })
}
