function Chain (handler) {
  this.handler = handler
}

Chain.prototype.setSuccessor = function (successor) {
  this.successor = successor
}

Chain.prototype.passRequest = function (...args) {
  let ret = this.handler.apply(this, args)
  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, args)
  } else {
    return ret
  }
}

export default Chain
