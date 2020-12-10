import { createApp } from "vue";
import "primeflex/primeflex.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import App from "./App.vue";
import router from "./router";

createApp(App)
  .use(router)
  .mount("#app");
