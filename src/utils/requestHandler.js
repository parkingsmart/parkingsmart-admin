import { Message, Loading } from 'element-ui';

const [_option, _promise] = [Symbol('_option'), Symbol('_promise')];
const [_errorHandle, _successHandle] = [Symbol('_errorHandle'), Symbol('_successHandle')];

const loadingOption = {
  lock: true,
  text: 'Loading',
  fullscreen: true,
  background: 'rgba(0, 0, 0, 0.3)'
};

const defaultOption = {
  showMsg: false,
  errorMsg: '系统错误',
  successMsg: null,

  showLoading: false,
  loadingOption: loadingOption
};

function successHandle() {
  if (this[_option].showMsg && this[_option].successMsg) {
    Message.success(this[_option].successMsg);
  }
}

function errorHandle(err) {
  if (this[_option].showMsg) {
    const message = err && err.message ? err.message : this[_option].errorMsg;
    Message.error(message);
  }
}

class RequestHandler {
  constructor(promise, option = {}) {
    this[_promise] = promise;
    this[_option] = Object.assign({}, defaultOption, option);
    this[_errorHandle] = errorHandle;
    this[_successHandle] = successHandle;
  }

  async exec() {
    let ret = null;
    let error = null;
    let loading = null;

    if (this[_option].showLoading) {
      loading = Loading.service(this[_option].loadingOption);
    }

    try {
      ret = await this[_promise];
      this[_successHandle]();
    } catch (err) {
      error = err;
      this[_errorHandle](err);
    } finally {
      if (this[_option].showLoading) {
        loading.close();
      }
    }

    if (error) {
      return Promise.reject(error);
    } else {
      return ret;
    }
  }

  msg(successMsg = null, errorMsg = null) {
    this[_option].showMsg = true;
    this[_option].errorMsg = errorMsg || this[_option].errorMsg;
    this[_option].successMsg = successMsg || this[_option].successMsg;
    return this;
  }

  loading(options = null) {
    this[_option].showLoading = true;
    this[_option].loadingOption = options || this[_option].loadingOption;
    return this;
  }
}

class RequestHandlerFactory {
  constructor(option) {
    this[_option] = option;
  }

  invoke(promise) {
    return new RequestHandler(promise, this[_option]);
  }
}

export default new RequestHandlerFactory();

export function initRequestHandler(option) {
  return new RequestHandlerFactory(option);
}