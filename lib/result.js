function Result() {
    this.status = "loading";
}

Result.prototype.setStatus = function(status) {
    this.status = status;
}
Result.prototype.setStart = function() {
    this._start = new Date();
}
Result.prototype.setEnd = function() {
    this._end = new Date();
}

Result.prototype.time = function() {
    return (this._end-this._start)/1000;
}


Result.prototype.set = function(result, data) {
    var self = this;

    if (data.toArray != null) {
        this.setStatus("loading");
        data.toArray(function(error, ar) {
            if (error) {
                self.setStatus("error");
                console.log(error.message);
            }
            else {
                self.setStatus("ready");
                result._data = ar;
                console.log(JSON.stringify(ar, null, 2));
                console.log('');
            }
        });
    }
    else {
        console.log(JSON.stringify(data, null, 2));
        console.log('');
        this._data = data;
    }
}

Result.prototype.data = function() {
    return result._data;
}

module.exports = Result;
