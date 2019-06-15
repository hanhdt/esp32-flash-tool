import { app } from 'electron'
import fs from 'fs'
import path from 'path'

function defaultAppLogo () {
  const uploadDir = path.join(app.getPath('userData'), '/images/')
  // create folder if not existed!
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
  }

  fs.copyFileSync(path.join(__static, '/images/', 'esp32-flash-tool.png'),
    path.join(uploadDir, 'esp32-flash-tool.png'))
}

// function defaultBackground () {
//   const uploadDir = path.join(app.getPath('userData'), '/images/')
//   // create folder if not existed!
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir)
//   }

//   fs.copyFileSync(path.join(__static, '/images/', 'background.png'),
//     path.join(uploadDir, 'background.png'))
// }

function defaultHeaderIcons () {
  const uploadDir = path.join(app.getPath('userData'), '/images/')
  if (!fs.existsSync(uploadDir)) { // create folder if not existed!
    fs.mkdirSync(uploadDir)
  }
  fs.copyFileSync(path.join(__static, '/images/', 'controller.svg'),
    path.join(uploadDir, 'controller.svg'))
  fs.copyFileSync(path.join(__static, '/images/', 'settings.svg'),
    path.join(uploadDir, 'settings.svg'))
}

function defaultSettingIcons () {
  const uploadDir = path.join(app.getPath('userData'), '/images/')
  if (!fs.existsSync(uploadDir)) { // create folder if not existed!
    fs.mkdirSync(uploadDir)
  }
  fs.copyFileSync(path.join(__static, '/images/', 'globe-solid.svg'),
    path.join(uploadDir, 'globe-solid.svg'))
  fs.copyFileSync(path.join(__static, '/images/', 'github-brands.svg'),
    path.join(uploadDir, 'github-brands.svg'))
  fs.copyFileSync(path.join(__static, '/images/', 'linkedin-brands.svg'),
    path.join(uploadDir, 'linkedin-brands.svg'))
}

export default function copyDefaultAssets () {
  defaultAppLogo()
  defaultHeaderIcons()
  defaultSettingIcons()
}
