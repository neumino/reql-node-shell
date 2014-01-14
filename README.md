reql-node-shell
===============

Wrapper around RethinkDB JavaScript driver for Node shell

This library load the RethinkDB driver and:
- overwrite `connect` to work without argument (default `localhost:28015`)
- add `repl` on a connection
- overwrite `run` to behave more friendly in a shell

_Note_: This library should NOT be used in a node application. This is mostly for debugging.

_Note_: This library does not block!

Use
==============
```js
> michel@xone:~$ node
> var r = require('rns')
undefined
> r.connect().repl()
undefined
> var result = r.dbList().run()
undefined
> [
  "test"
]

> result
{ _status: 'ready',
  _start: Tue Jan 14 2014 10:31:11 GMT-0800 (PST),
  _end: Tue Jan 14 2014 10:31:11 GMT-0800 (PST),
  _data: [ 'test' ] }
> result.status()
'ready'
> result.time()
0.002
> result.data()
[ 'test' ]
> 
```
