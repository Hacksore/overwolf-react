module.exports.settings = {
  registerHotKey: () => {},
  getHotKey: () => { return {} },
}

module.exports.windows = {
  getCurrentWindow: () => {},
  obtainDeclaredWindow: (windowName, callback) => {
    const result = {
      window: {
        id: "Window_Extension_oknpgldicgjbpcdbipjebcocijknfambckagnfhn"
      }
    }
    callback(result);
  }
}