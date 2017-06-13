const fs = require('fs'); // utility from node.js to interact with the file system
const zlib = require('zlib'); // utility from node.js to interact with the file system
const path = require('path'); // utility from node.js to manage file/folder paths

const AWS = require('aws-sdk'); // imports AWS SDK
const mime = require('mime-types'); // mime type resolver

// configuration necessary for this script to run
const config = {
  s3BucketName: 'www.cozzbp.com',
  folderPath: '../build' // path relative script's location
};

// initialise S3 client

const credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
const s3 = new AWS.S3({ signatureVersion: 'v4', credentials });

// resolve full folder path
const distFolderPath = path.join(__dirname, config.folderPath);

const readDir = (folder) => {
  fs.readdir(folder, (err, files) => {
    if (!files || files.length === 0) {
      console.log(`provided folder '${folder}' is empty or does not exist.`);
      return;
    }

    // for each file in the directory
    for (const fileName of files) {
      const filePath = path.join(folder, fileName);
      const relativePath = filePath.replace(`${distFolderPath}/`, '');

      fs.lstat(filePath, (error, stats) => {
        if (error) { return console.log(error); }

        if (stats.isFile()) {
          fs.readFile(filePath, (error, fileContent) => {
            if (error) { return console.log(error); }

            const mimeType = mime.lookup(fileName);

            zlib.gzip(fileContent, (error, result) => {
              if (error) { return console.log(error); }

              s3.putObject({
                Bucket: config.s3BucketName,
                Key: relativePath,
                Body: result,
                ContentType: `${mimeType}`,
                ContentEncoding: 'gzip'
              }, (res) => {
                console.log(`Successfully uploaded '${fileName}' with MIME type '${mimeType}'!`);
              });
            });
          });
        } else if (stats.isDirectory()) {
          readDir(filePath);
        }
      });
    }
  });
};

readDir(distFolderPath);
