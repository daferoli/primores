import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';

export default function falcorService() {
    var model = new falcor.Model({
        source: new HttpDataSource('http://localhost:8000/model.json', {
            crossDomain: true
        })
    });

    function getModel (path) {
        console.log('getting from model with path ', path);
        return model.get(path)
        .then((res) => {
            return res.json;
        })
    }
    
    function setModel (jsonGraph) {
        console.log('setting to the model for paths', jsonGraph.paths);
        return model.set(jsonGraph)
        .then((res) => {
            console.log(res);
            return res;
        });
    }
    
    function callModel (path, args) {
        console.log('calling model with path %o and args %o', path, args);
        return model.call(path, args, [], [])
        .then((res) => {
            console.log(res);
            return res
        })
    }
    
    return {
        getModel: getModel,
    
        setModel: setModel,
    
        callModel: callModel
    };
};