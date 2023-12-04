import axios from "axios";

const CheckUpdate = () => {
  let url: string = `//${window.location.host}/static/version.json?t=${new Date().getTime()}`;
  axios.get(url).then(res => {
    if (res.status === 200) {
      let vueVersion = res.data.version;
      let localVueVersion: string | null = localStorage.getItem("vueVersion");
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