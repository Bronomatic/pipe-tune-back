const Tune = require('../models/tune');

exports.createTune = (req, res, next) => {
  const alteredTuneBody = req.body
    .abc
    .split(String.fromCharCode(10))
    .join('<new-line>');

  const tune = new Tune({
    creator: req.body.creator,
    title: req.body.title,
    composer: req.body.composer,
    origin: req.body.origin,
    meter: req.body.meter,
    type: req.body.type,
    share: req.body.share,
    body: alteredTuneBody
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

exports.getTuneById = (req, res, next) => {
  const id = req.query.id;
  console.log(id);

  Tune.findById(id)
    .then(result => {
      const filteredResult = result;
      const filteredBody = result.body.split('<new-line>').join('\n');
      filteredResult.body = filteredBody;
      res.status(200).json({result: filteredResult});
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({message: 'Not found in database'});
    });
};
