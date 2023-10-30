import axios from "axios";

const CheckUpdate = () => {
  let url = `//${window.location.host}/static/version.json?t=${new Date().getTime()}`;
  axios.get(url).then(res => {
    if (res.status === 200) {
      let vueVersion = res.data.version;
      let localVueVersion = localStorage.getItem("vueVersion");
      if (localVueVersion && localVueVersion != vueVersion) {
        localStorage.setItem("vueVersion", vueVersion);
        window.location.reload();
        return;
      } else {
        localStorage.setItem("vueVersion", vueVersion);
      }
    }
  });
};

export default {
  CheckUpdate
};