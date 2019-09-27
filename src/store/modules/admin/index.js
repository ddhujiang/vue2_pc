const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
console.log(modules);
console.log('store---------------------------');

export default {
  namespaced: true,
  modules
}
