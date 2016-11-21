import express from 'express'
import Photo from '../models/photo'
import path from 'path'
import fs from 'fs'

/*
 *
 *  multer: https://github.com/expressjs/multer
 *
 */
import multer from 'multer' // 文件上传
let uploadMulter = multer({ dest: path.join(__dirname, '../public/tmp')})

const router = express.Router()
const { join } = path


router.get('/', function (req, res, next) {
  Photo.find({}, (err, photos) => {
    if (err) return next(err)
    res.render('photos', {
      title: 'Photos',
      photos
    })
  })
})


router.get('/upload', function (req, res) {
  res.render('photos/upload', {
    title: 'Photo upload'
  })
})

router.post('/upload', uploadMulter.single('photo[image]'), function (req, res, next) {
  const img = req.file
  const name = req.body.photo.name || img.filename
  const path = join(__dirname, '../public/photos/', name)

  fs.rename(img.path, path, err => {
    if (err) return next(err)

    Photo.create({
      name,
      path: `/photos/${name}`
    }, err => {
      if (err) return next(err)
      res.redirect('/')
      /*fs.unlink(img.path, err => {
        if (err) console.error(`del: ${err}`)
      })*/
    })
  })
})

router.get('/photo/:id/download', function (req, res, next) {
  var id = req.params.id
  Photo.findById(id, (err, photo) => {
    if (err) return next(err)
    const path = join(__dirname, '../public', photo.path)
    //
    // res.sendfile(path)
    //
    res.download(path, 'new-file-name')
  })
})

router.get('/removeall', (req, res, next) => {
  Photo.remove({}, err => {
    res.end('移除完毕')
  })
})

module.exports = router

