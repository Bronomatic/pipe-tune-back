const Tune = require('../models/tune');

exports.createTune = (req, res, next) => {
  const tune = new Tune({
    creator: req.body.creator,
    title: req.body.title,
    composer: req.body.composer,
    origin: req.body.origin,
    meter: req.body.meter,
    type: req.body.type,
    body: req.body.body
  })

  tune.save().then(result => {
    res.status(201).json({
      message: 'tune creation successful',
      result: result
    })
  })
  .catch(err => {
    res.status(401).json({
      message: 'tune creation failed'
    })
  })
}
