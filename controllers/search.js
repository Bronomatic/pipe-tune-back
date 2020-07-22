const Tune = require('../models/tune');

exports.search = (req, res, next) => {
  let query = {}
  const each = req.query.v.split(' ').join('|');
  query[req.query.q] = {$regex: new RegExp(each, "i")}

  Tune.find(query)
    .then(result => {
      if(result){
        res.status(200).json({result: result});
      }else{
        res.status(404).json({message: 'No post found'});
      }
    })
    .catch(err => {
      res.status(500).json({error: err});
    })
}