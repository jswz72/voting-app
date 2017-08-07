'use strict';

function clickHandler(db){
    let clicks = db.collection('clicks');

    this.getClicks = function(req, res){
        const clickProjection = { '_id': false };
        clicks.findOne({}, clickProjection, function (err, result){
            if (err) throw err;
            if(result){
                res.json(result);
            } else{
                clicks.insert({ 'clicks': 0}, function (err){
                    if (err) throw err;
                    clicks.findOne({}, clickProjection, function (err, doc){
                        if (err) throw err;
                        res.json(doc);
                    })
                })
            }

        });
    };

    this.addClick = function(req, res){
        clicks.findAndModify(
            {},
            { '_id': 1},
            { $inc: {'clicks': 1} },
            (err, result) => {
                if (err) throw err;
                res.json(result);
            }
        );
    }

    this.resetClicks = function(req, res){
        clicks.update(
            {},
            { 'clicks': 0},
            (err, result) => {
                if (err) throw err;
                res.json(result);
            }
        )
    }
}
module.exports = clickHandler;