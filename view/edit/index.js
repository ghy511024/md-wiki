/**
 * Created by cyl on 2018/6/30.
 */
import app from './index.vue';
import nav from "./component/nav.vue";
import iView from 'iview';

// import 'iview/dist/styles/iview.css';

window.Vue.component("page-nav", nav);
new Vue({
    el: '#app',
    render: function (h) {
        return h(app)
    }
});