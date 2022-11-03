<<<<<<< HEAD
export const fetcher = async (...args) => {
    
    const response = await fetch(...args);
    //console.log('response', response);
    let payload;
    try {
        if (response.status === 204)
            return null;
        payload = await response.json();
    } catch (error) {
        console.error(error);
    }
    if (response.ok) {
        //console.log("response ok");
        return payload;
    } else {
        return Promise.reject(payload.error || new Error(response.message));
    }
=======
export const fetcher = (...args) => {
  return fetch(...args).then(async (response) => {
    console.log("response", response);
    let payload;
    try {
      if (response.status === 204) return null;
      payload = await response.json();
      console.log("payload", payload);
    } catch (error) {
      console.error(error);
    }
    if (response.ok) {
      console.log("response ok");
      return payload;
    } else {
      return Promise.reject(payload.error || new Error(response.message));
    }
  });
>>>>>>> olifi-FE
};
