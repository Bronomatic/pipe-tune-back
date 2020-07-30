const Tune = require('../models/tune');

exports.search = (req, res, next) => {
  const searchType = Object.keys(req.query)[0];

  if(searchType === 'q'){
    // * General search
    let query = {}
    const each = req.query.v.split(' ').join('|');
    query[req.query.q] = {$regex: new RegExp(each, "i")};
    query.share = true;

    Tune.find(query)
      .then(result => {
        if(result){
          res.status(200).json({result: result});
        }else{
          res.status(404).json({message: 'No tunes found'});
        }
      })
      .catch(err => {
        res.status(500).json({message: 'error'});
      })
  }else if(searchType === 'u'){
    // * Get all users tunes
    const username = req.query.u;
    Tune.find({"creator": username})
      .then(result => {
        res.status(200).json({result: result});
      })
      .catch(err => {
        res.status(404).json({message: 'not found'});
      });
  }else if(searchType === 'a'){
    const query = req.query.a;
    const queryArray = query.split('-');
    Tune.find({_id: {$in: queryArray}})
      .then(result => {
        res.status(200).json({result: result});
      })
      .catch(err => {
        res.status(404).json({message: 'not found'});
      })

  }

}
