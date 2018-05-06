exports.API = function(route, options, callback){
    fetch(route, options).then(function(result){
        if(result.ok){
            return result.json();
        }else{
            throw result.text();
        }
    }).then(function(resJSON){
        callback(null, resJSON)
    }).catch(function(err){
        err.then(function(errStr){
            callback(errStr);
        })
    });
}