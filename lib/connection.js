function Connection(r) {
    this.r = r;
};

Connection.prototype.repl = function() {
    this.r._defaultConnection = this;
}


module.exports = Connection
