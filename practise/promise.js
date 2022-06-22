// Promises/A+
/*
  promise 状态: pending, fulfilled, rejected
  pending: 处于 pending 状态时, 可以转换到 fulfilled 或 rejected 状态。
  fulfilled: onFulfilled 回调必须按照它们对应的 then 的原始调用顺序来执行。
             处于 fulfilled 状态时, 不得过渡到任何其他状态。必须有一个不能改变的值。
  rejected: onRejected 回调必须按照它们对应的 then 的原始调用顺序来执行。
             处于 rejected 状态时, 不得过渡到任何其他状态。必须有一个不能改变的值。
 */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  status = PENDING

  value = undefined

  reason = undefined

  successCallback = []

  failCallback = []

  resolve = (value) => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为成功
    this.status = FULFILLED
    // 保存成功之后的值
    this.value = value
    // 判断成功回调是否存在
    while (this.successCallback.length > 0) this.successCallback.shift()(this.value)
  }

  reject = (reason) => {
    // 如果状态不是等待 阻止程序向下执行
    if (this.status !== PENDING) return
    // 将状态更改为失败
    this.status = REJECTED
    // 保存失败后的原因
    this.reason = reason
    // 判断失败回调是否存在
    while (this.failCallback.length > 0) this.failCallback.shift()(this.reason)
  }

  then = (successCallback, failCallback) => {
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        const x = successCallback(this.value)
        this.resolvePromise(promise2, x, resolve, reject)
      } else if (this.status === REJECTED) {
        const x = failCallback(this.reason)
        this.resolvePromise(promise2, x, resolve, reject)
      } else {
        this.successCallback.push(successCallback)
        this.failCallback.push(failCallback)
      }
    })
    return promise2
  }

  // eslint-disable-next-line consistent-return
  resolvePromise = (promise2, x, resolve, reject) => {
    // promise2 = then方法返回的Promise  x =then方法中回调返回的promise
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (x instanceof MyPromise) {
      // eslint-disable-next-line promise/catch-or-return
      x.then(resolve, reject)
    } else {
      resolve(x)
    }
  }
}

module.exports = MyPromise
