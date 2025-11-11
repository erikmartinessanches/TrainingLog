/** This allows us to use a proper continue URL depending on our environment. */
const continuationUrlDomain = () => {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    //Consider making the port depend on firebase and vite configuration
    return `http://localhost:${import.meta.env.VITE_APP_PORT}`;
  } else {
    return `https://${import.meta.env.VITE_APP_PROJECT_ID}.web.app`;
  }
};

export { continuationUrlDomain };
