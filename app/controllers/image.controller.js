"use strict";

const fs = require("fs/promises");
const path = require('path');

const Image = require("../Database/models/image")

const Upload = require('../utils/upload');
const BaseErr = require('../errors/baseErr');


async function upload(req, res, next) {
  try {
    const upload = new Upload(req.params.section);
    await upload.single(req, res, 'image');
    console.log("req.user.id",);
    const image = await Image.create({
      name: req.file.filename,
      section: req.params.section,
      userId: req.user.id,
      src: req.protocol + "://" + req.get("host") + "/api/images/" + req.params.section + "/" + req.file.filename,
    })

    return res.status(201).json({
      success: true,
      message: "the image uploaded.",
      data: image
    })
  } catch (e) {
    next(e);
  }
}

async function getAll(req, res, next) {
  try {

    const images = await Image.findAll({
      where: { userId: req.user.id }
    })

    if (!images) {
      throw new BaseErr(
        'ImagesNotFound',
        404,
        true,
        `Images not found :( `
      );
    }
    return res.status(200).json({
      success: true,
      data: images
    })
  } catch (e) {
    next(e);
  }
}

async function image(req, res, next) {
  try {
    let url = path.join(__dirname, '../public/uploads/' + req.params.section + "/" + req.params.image);
    res.sendFile(url);
  } catch (e) {
    next(e);
  }
}

async function removeUpload(req, res, next) {
  try {
    const image = await Image.findOne({
      where: { id: req.params.id }
    })
    
    if (!image) {
      throw new BaseErr(
        'ImageNotFound',
        404,
        true,
        `The image not found :( `
      );
    }

    console.log("image.userId",image.userId);
    console.log("req.user.id",req.user.id);

    if (image.userId != req.user.id){
      throw new BaseErr(
        'TheImageDoesNotBelongToThisUser',
        403,
        true,
        `The image does not belong to this user`
      );
    }

    await fs.unlink(
      path.join(
        __dirname,
        `../public/uploads/${image.section}/${image.name}`
      )
    );

    await image.destroy()

    return res.status(200).json({
      success: true,
      message: "the images deleted :) "
    })
  } catch (e) {
    next(e);
  }
}

// export controller
module.exports = {
  upload,
  getAll,
  image,
  removeUpload
};
