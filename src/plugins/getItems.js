export default function ({ $axios, store }) {
  $axios.onError((error) => {
    if (error.response && error.response.status === 500) {
      console.log("error.response.status === 500");
    }
  });
  $axios.interceptors.response.use((response) => {
    if (response.status === 200) {
      if (
        response.request.responseURL &&
        response.request.responseURL.includes("http://localhost:8000/api/items")
      ) {
        const unsubscribe = store.subscribe((mutation, state) => {
          console.log(mutation.type);
          console.log(mutation.payload);
        });

        unsubscribe();
      }
    }
    return response;
  });
}
