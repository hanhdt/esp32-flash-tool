# ESP32 Flash Tool

A desktop application for flashing production ESP32 firmware. App suports multiple platforms (Windows, MacOS, Linux)

![ESP32 Flash Tool](/esp32-flash-tool.png)

## Motivation

Simplify settings, clean UI and focus on mass manufacturing process where development and manufacturing are separated steps.

## Dependencies install

- Node v14.19.1
- Python v2.7
- ESP32 Flash Tool depends on pySerial version 3.0 or newer for serial communication with the target device. Hence, you should install `Python` before start run the app.

To install pySerial manually by running something like:

```Shell
$pip install pyserial
or
$easy_install pyserial
or
$apt-get install python-serial
```

depending on your platform. (The official pySerial installation instructions are [here](https://pyserial.readthedocs.org/en/latest/pyserial.html#installation)).

## How to build from source?

### Install dependencies

```Shell
$npm install
```

### Build app

```Shell
$npm run build
```

### Run app locally

```Shell
$npm run dev
```

### Package app

```Shell
$npm run package
```

## Firmware manufacturing process

Imagine you have at least 5 steps from firmware development to flashing firmware into production board. The app would be used at **Step 5** in the process flowing:

![Firmware Manufacturing Process](/esp32-firmware-manufacturing-process.png)

- Step 1: Develop & build firmware, you can use [ESP32-IDF](https://github.com/espressif/esp-idf) or [Andruino core for esp32](https://github.com/espressif/arduino-esp32)

- Step 2: Build and get signed binary files

- Step 3: Create factory data specific binary file by using command line tools such as [NVS Partition Generator Utility](https://docs.espressif.com/projects/esp-idf/en/latest/api-reference/storage/nvs_partition_gen.html#nvs-partition-generator-utility), [Manufacturing Utility](https://docs.espressif.com/projects/esp-idf/en/latest/api-reference/storage/mass_mfg.html)

- Step 4: [Compress all binaries file into a single zip with `parititions.csv`](#create-a-single-compressed-file-for-esp32-flash-tool) specify binaries' offsets.

- Step 5: **Flash to ESP32 board by ESP32 Flash Tool**

## Create a single compressed file for ESP32 Flash Tool

ESP32 flash tool uses a single zipped file for flashing, just simply collect all required binaries, and create `partitions.csv` in the same folder then compress all into a zip file.

## `partitions.csv` file format

ESP32 flash tool uses `partitions.csv` for identifying offsets of binary blobs.
Sample of `partitions.csv` will be:

```CSV
id,name,offset
1,bootloader.bin,0x1000
2,ota_data_initial.bin,0xd000
3,partitions.bin,0xf000
4,device-00001.bin,0x10000
5,app.bin,0x20000
```

---
