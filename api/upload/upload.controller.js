const fs = require('fs');
const cloudinary = require('cloudinary').v2;

async function uploadSingleHandler(req, res) {
  const { file, body } = req;
  const options = {};
  if (body?.folder) {
    options.folder = body.folder;
  }
  const image = file?.path ?? body.image;

  try {
    const result = await cloudinary.uploader.upload(image, options);
    // console.log('result in image', result)
    if (file?.path) {
      fs.unlinkSync(file?.path);
    }
    res.status(201).json(result);
  } catch (error) {
    console.log('error', error);
  }
}


module.exports = {
  uploadSingleHandler,
};
