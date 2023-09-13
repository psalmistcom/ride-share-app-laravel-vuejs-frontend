import { createApp } from "vue";
// import VueGoogleMaps from "@fawmi/vue-google-maps";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

// app
//   .use(VueGoogleMaps, {
//     load: {
//       key: "AIzaSyDj87ylpSgBmQnM5NPlkOtKVv0RQEe28ro",
//       libraries: "places",
//     },
//   })
//   .mount("#app");

app.use(createPinia());
app.use(router);

app.mount("#app");
