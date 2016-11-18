var photos = []
photos.push({
  name: 'Node.js Logo',
  path: 'http://gengliming.com/assets/images/avatar.jpg'
})
photos.push({
  name: 'Ryan Speaking',
  path: 'http://gengliming.com/assets/images/avatar.jpg'
})

exports.list = function (req, res) {
  res.render('photos', {
    title: 'Photos',
    photos: photos
  })
}
