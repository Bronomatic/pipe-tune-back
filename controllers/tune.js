const Tune = require('../models/tune');

exports.createTune = (req, res, next) => {
  const alteredTuneBody = req.body
    .body
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
    tempo: req.body.tempo,
    body: alteredTuneBody
  })

  tune.save().then(result => {
    res.status(201).json({
      message: 'tune creation successful',
      result: result
    })
  })
  .catch(err => {
    console.log(err);
    res.status(401).json({
      message: 'tune creation failed'
    })
  })
};

exports.deleteTune = (req, res, next) => {
  const id = req.params.id;
  Tune.deleteOne({_id: id})
    .then(result => {
      if(result.n > 0){
        res.status(200).json({message: 'success'});
      }else{
        res.status(401).json({message: 'not authorized'});
      }
    })
    .catch(err => {
      res.status(500).json({message: 'failed'});
    })
};

exports.getTuneById = (req, res, next) => {
  const id = req.params.id;

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
