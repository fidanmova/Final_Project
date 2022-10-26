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
};
