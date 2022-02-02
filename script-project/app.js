const fs = require('fs');
const os = require('os');
const path = require('path');

const createdFolder = process.argv[2];
const mainPath = path.join(os.homedir(), 'Desktop/Pictures', createdFolder);
!fs.existsSync(mainPath) && fs.mkdirSync(mainPath);

if (!createdFolder || !fs.existsSync(mainPath)) {
  console.error('Please check folder');
  return;
}

const videoDir = path.join(mainPath, 'video');
const capturedDir = path.join(mainPath, 'captured');
const duplicatedDir = path.join(mainPath, 'duplicated');

!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

fs.promises
  .readdir(mainPath) //
  .then(extensionCheck)
  .catch(console.error);

function fileMoveHandler(file, dir) {
  const parsed = path.parse(dir);
  console.info(`move ${file} to ${parsed.root}${parsed.base}`);
  const oldPath = path.join(mainPath, file);
  const newPath = path.join(dir, file);
  fs.promises
    .rename(oldPath, newPath) //
    .catch(console.error);
}

function extensionCheck(files) {
  files.forEach((file) => {
    if (isVideoFile(file)) {
      fileMoveHandler(file, videoDir);
    } else if (isCapturedFile(file)) {
      fileMoveHandler(file, capturedDir);
    } else if (isDuplicatedFile(files, file)) {
      fileMoveHandler(file, duplicatedDir);
    }
  });
}

function isVideoFile(file) {
  const regExp = /(mp4|mov)$/gm;
  const match = file.match(regExp);
  return !!match;
}

function isCapturedFile(file) {
  const regExp = /(png|aae)$/gm;
  const match = file.match(regExp);
  return !!match;
}

function isDuplicatedFile(files, file) {
  if (!file.startsWith('IMG_') || file.startsWith('IMG_E')) {
    return false;
  }
  const edited = `IMG_E${file.split('_')[1]}`;
  const match = files.find((file) => file.includes(edited));
  return match;
}
