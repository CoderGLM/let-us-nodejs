module.exports = function (req, res) {
  res.status(404).format({
    html: () => {
      res.render('404')
    },
    json: () => {
      res.send({ message: 'Resource not found' }) 
    },
    xml: () => {
      res.write(`<error>\n
                   <message></message>\n
                 </error>\n`)
    },
    text: () => {
      res.send('Resource not found\n')
    }
  })
}
