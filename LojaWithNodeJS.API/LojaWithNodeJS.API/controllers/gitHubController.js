module.exports.start = function (app) {
    app.get("/organizations", function (req, res) {
        var request = require("request");
        
    });
    app.get("/users", function (req, res) {

        //paginação
        var usuarios = "";
        var request = require("request");
        var auth = "Basic YW5kcmVzZWVkOkRlbWFjb2xAMTMzMQ==";

        request({
            uri: "https://api.github.com/users?page=1&per_page=10",
            method: "GET",
            headers: {
                "User-Agent": "andreseed",
                "Authorization": auth
            }
        }, function (error, response, body) {
            if (error != null)
                console.log(error);
            var coll = JSON.parse(body);
            var reqAux = require("request");
            var usuario = {
                id: "",
                login: "",
                followers: "",
                avatar_url: "",
                name:""
            };

            for (i in coll) {
                var uri = "https://api.github.com/users/" + coll[i].login;
                console.log(uri);
                var iterator = 0;
                reqAux({
                    uri: uri,
                    method: "GET",
                    headers: {
                        "User-Agent": "andreseed",
                        "Authorization": auth
                    }
                }, function (error2, res2, body2) {
                    var coll2 = JSON.parse(body2);
                    usuario.id = coll2.id;
                    usuario.login = coll2.login;
                    usuario.avatar_url = coll2.avatar_url;
                    usuario.followers = coll2.followers;
                    usuario.name = coll2.name;
                    usuarios += iterator == 0 ? "["+JSON.stringify(usuario) : "," + JSON.stringify(usuario);

                    if (++iterator == coll.length) {
                        usuarios += "]";
                        res.set('Content-Type', 'application/json');
                        res.send(JSON.parse(usuarios));
                    } 
                });
            }
        }); //fim do request
    });

       
}
