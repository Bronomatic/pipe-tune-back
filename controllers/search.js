const Tune = require('../models/tune');

exports.search = (req, res, next) => {
  if(req.query.v === 'null' || req.query.v === ''){ return };
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
          const data = resultFilter(result);
          res.status(200).json({result: data});
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
        const data = resultFilter(result);
        res.status(200).json({result: data});
      })
      .catch(err => {
        res.status(404).json({message: 'not found'});
      });
  }else if(searchType === 'a'){
    const query = req.query.a;
    const queryArray = query.split('-');
    Tune.find({_id: {$in: queryArray}})
      .then(result => {
        const data = resultFilter(result);
        res.status(200).json({result: data});
      })
      .catch(err => {
        res.status(404).json({message: 'not found'});
      })
  }

}

const resultFilter = (result) => {
  const filteredBody = result[0]['body'].split('<new-line>').join('\n');
  let data = { ...result }
  data[0].body = filteredBody;
  return data;
}