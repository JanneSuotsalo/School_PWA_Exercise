window.addEventListener("load", async () => {
  "use strict";

  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./sw.js");
    } catch (e) {
      console.log(e.message);
    }
  }
});
