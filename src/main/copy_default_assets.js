import { app } from 'electron'
import fs from 'fs'
import path from 'path'

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

function defaultAboutIcons () {
  const uploadDir = path.join(app.getPath('userData'), '/images/')
  if (!fs.existsSync(uploadDir)) { // create folder if not existed!
    fs.mkdirSync(uploadDir)
  }
  fs.copyFileSync(path.join(__static, '/images/', 'globe-solid.svg'),
    path.join(uploadDir, 'globe-solid.svg'))
  fs.copyFileSync(path.join(__static, '/images/', 'facebook-brands.svg'),
    path.join(uploadDir, 'facebook-brands.svg'))
  fs.copyFileSync(path.join(__static, '/images/', 'twitter-brands.svg'),
    path.join(uploadDir, 'twitter-brands.svg'))
  fs.copyFileSync(path.join(__static, '/images/', 'instagram-brands.svg'),
    path.join(uploadDir, 'instagram-brands.svg'))
}

export default function copyDefaultAssets () {
  defaultHeaderIcons()
  defaultAboutIcons()
}
