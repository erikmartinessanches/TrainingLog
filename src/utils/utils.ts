const continuationUrl = () => {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    return 'localhost/dashboard';
  } else {
    return `https://${import.meta.env.VITE_APP_PROJECT_ID}.web.app/dashboard`;
  }
};
export { continuationUrl };
