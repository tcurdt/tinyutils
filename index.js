'use strict'

module.exports.throw = function(msg) {
  throw new Error(msg)
}

module.exports.spread = function(fn) {
  return function (values) {
    return fn.apply(null, values)
  }
}

module.exports.merge = function() {
  const objects = Array.prototype.slice.call(arguments)
  const r = {}
  objects.forEach(function(object){
    if (object) {
      Object.keys(object).forEach(function(key){
        r[key] = object[key]
      })
    }
  })
  return r
}

module.exports.collect = function(fn) {
  const items = []
  fn(function(item) {
    items.push(item)
  })
  return items
}

module.exports.collectAsync = function(fn) {
  return Promise.resolve(collect(fn))
}

module.exports.max = function(values) {
  let m = undefined
  values.forEach(function(v) {
    if (v != undefined) {
      m = (m != undefined) ? Math.max(m, v) : v
    }
  })
  return m
}

let _objid = 1
module.exports.objectId = function(obj) {
  if (obj == null) {
    return null
  }
  if (obj._objid == null) {
    obj._objid = _objid++
  }
  return obj._objid
}

module.exports.stripBasedir = function(basedir, s) {
  if (basedir) {
    // FIXME
    return s.replace(new RegExp('^' + basedir + '/'), '')
  } else {
    return s
  }
}
