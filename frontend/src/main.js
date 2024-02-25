/*!

 =========================================================
 * Vue Black Dashboard PRO - v1.4.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/vue-black-dashboard-pro
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 * Coded by Creative Tim

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */
import Vue from "vue";
import VueRouter from "vue-router";
import RouterPrefetch from "vue-router-prefetch";
import DashboardPlugin from "./plugins/dashboard-plugin";
import App from "./App.vue";

// router setup
import router from "./routes/router";
import i18n from "./i18n";
import "./registerServiceWorker";

// Import Amplify and its Vue components
import Amplify from 'aws-amplify';
import { AmplifyPlugin } from '@aws-amplify/ui-vue';
// Import the configuration (this is created by Amplify CLI and contains your AWS resource configurations)
import awsExports from './aws-exports';
// Configure Amplify with your AWS resources
Amplify.configure(awsExports);

// plugin setup
Vue.use(DashboardPlugin);
Vue.use(VueRouter);
Vue.use(RouterPrefetch);
Vue.use(AmplifyPlugin);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  i18n,
});

