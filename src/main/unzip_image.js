import { app } from 'electron'
import fs from 'fs'
import path from 'path'
const yauzl = require('yauzl')

function uploadBinFiles (mainWindow, fileName, readStream) {
  let uploadDir = path.join(app.getPath('userData'), '/firmware/')
  // create folder if not existed!
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
  }

  const dest = path.join(uploadDir, fileName)
  const file = fs.createWriteStream(dest)
  readStream.pipe(file)
  readStream.on('end', () => {
    // console.log('Unzipped: ', dest)

    // TODO: Need to detect .bin files automatically, should be specfied from settings
    if (fileName === 'bootloader.bin') {
      mainWindow.webContents.send('bin-file-unzipped', 0, dest)
    } else if (fileName === 'ota_data_initial.bin') {
      mainWindow.webContents.send('bin-file-unzipped', 1, dest)
    } else if (fileName === 'partitions.ota.bin') {
      mainWindow.webContents.send('bin-file-unzipped', 2, dest)
    } else if (fileName === 'asn2.bin') {
      mainWindow.webContents.send('bin-file-unzipped', 3, dest)
    }
  })
}

export default function unzipImage (mainWindow, params) {
  yauzl.open(params.filePath, params.options, (err, zipFile) => {
    if (err) throw err

    zipFile.on('error', (err) => {
      throw err
    })

    zipFile.on('entry', (entry) => {
      zipFile.openReadStream(entry, (err, readStream) => {
        if (err) throw err
        console.log('File:', entry.fileName)
        uploadBinFiles(mainWindow, entry.fileName, readStream)
      })
    })
  })
}
