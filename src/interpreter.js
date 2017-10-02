var Interpreter = function () {

    this.DB = {};

    this.parseDB = function (params) {
        DB = params;
    }

    this.searchFact = function (params) {
        for(var i = 0;i<DB.length;i++){
            if( DB[i].indexOf(params) != -1 ){
                return true;
            }
        }
        return false;
    }

    this.checkQuery = function (params) {
        //return true;
        if (!( (params.indexOf("hijo") != -1) || (params.indexOf("hija") != -1) )){
            return this.searchFact(params);
        }else{
            var res = params.split("(");
            var ruleName = res[0];
            var hijo = res[1].split(",")[0];
            var padre = res[1].split(", ")[1].split(")")[0];
            var rulePatter = {};

            for(var i = 0;i<DB.length;i++){
                if( DB[i].indexOf(ruleName) != -1 ){
                    rulePatter = DB[i];
                }
            }

            rulePatter = rulePatter.replace(/X/g, hijo);
            rulePatter = rulePatter.replace(/Y/g, padre);
            res = rulePatter.split(":- ")[1];
            res = res.split(", ");
            var factGenero = res[0];
            var factPadre = res[1] + ", " + res[2];

            if(this.searchFact(factGenero) && this.searchFact(factPadre)){
                return true;
            }else{
                return false; }
        }
    }

}

module.exports = Interpreter;
