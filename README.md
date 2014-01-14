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
michel@h9:~$ node
> var r = require('rns')
undefined
> r.connect().repl()
undefined
> var result = r.dbList().run()
undefined
> [
  "thinky_test",
  "test"
]

> result
{ status: 'ready',
  _start: Tue Jan 14 2014 09:29:57 GMT-0800 (PST),
  _end: Tue Jan 14 2014 09:29:57 GMT-0800 (PST),
  _data: [ 'thinky_test', 'test' ] }
> result.time()
0.008
> result.data()
[ 'thinky_test', 'test' ]
> 
```
