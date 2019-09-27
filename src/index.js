import Vue from 'vue'
import store from '@/store/index'
import VueRouter from 'vue-router'
// import 'element-ui/lib/theme-chalk/index.css';
import '../theme/index.css'
import App from '@/app.vue'
import Element from 'element-ui';
import createRouter from '@/router/index'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(VueRouter)
Vue.use(Element, {
  size: 'small',
  zIndex: 3000
})

const router = createRouter()

const root = document.createElement('div');
document.body.appendChild(root);
console.log(process.env.NODE_ENV)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount(root);