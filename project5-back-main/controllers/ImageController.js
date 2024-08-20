const fs = require('fs');

class ImageController {
  uploadSingle(req, res) {
    return res.status(200).json(req.file);
  }

  uploadSingleCloudinary(req, res, next) {
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
   
    return res.json({ secure_url: req.file.path });
  }

  async uploadMultipleCloudinary (req, res, next) {
    let pictureFiles = req.files;
    //Check if files exist
    if (!pictureFiles)
      return res.status(400).json({ message: "No picture attached!" });
    
    return res.status(200).json({ images: pictureFiles });
  }

  remove (req, res) {
    const fileName = req.body.name;
    const directoryPath = __basedir + "/public/images/";
  
    fs.unlink(directoryPath + fileName, (err) => {
      if (err) {
        return res.status(500).json({
          message: "Could not delete the file. " + err,
        });
      }
  
      return res.status(200).json({
        message: "File is deleted.",
      });
    });
  };
}

module.exports = new ImageController();
