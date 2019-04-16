import { PythonShell } from 'python-shell'

let options = {
  mode: 'text',
  pythonPath: 'python',
  pythonOptions: ['-u'], // get print results in real-time
  scriptPath: 'node_modules/esptool.git/',
  args: []
}

export default function spiFlashImage (mainWindow, params) {
  options.args = [
    '--chip', params.chip,
    '--port', params.port,
    '--baud', params.baudRate,
    '--before', params.before,
    '--after', params.after,
    'write_flash', params.compress,
    '--flash_mode', params.flashMode,
    '--flash_freq', params.flashFreq,
    '--flash_size', params.flashSize,
    params.initialOTAIndex, params.initialOTADataBinPath,
    params.bootloaderIndex, params.bootloaderBinPath,
    params.appIndex, params.appBinPath,
    params.partitionsTableIndex, params.partitionsBinPath]

  let pyShell = new PythonShell('esptool.py', options)

  pyShell.on('message', (message) => {
    // console.log('message: %j', message)
    mainWindow.webContents.send('flashing-progress-updated', message)
  })

  pyShell.end((err, code, signal) => {
    if (err) {
      mainWindow.webContents.send('flashing-progress-completed', 1, null)
      throw err
    }
    mainWindow.webContents.send('flashing-progress-completed', code, signal)
  })
}
