var photos = []
photos.push({
  name: 'Node.js Logo',
  path: ''
})
photos.push({
  name: 'Ryan Speaking',
  path: ''
})

exports.list = function (req, res) {
  res.render('photos', {
    title: 'Photos',
    photos: photos
  })
}
