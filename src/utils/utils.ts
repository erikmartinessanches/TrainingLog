/** This allows us to use a proper continue URL depending on our environment. */
const continuationUrlDomain = () => {
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    //Consider making the port depend on firebase and vite configuration
    return `http://localhost:${import.meta.env.VITE_APP_PORT}`;
  } else {
    return `https://${import.meta.env.VITE_APP_PROJECT_ID}.web.app`;
  }
};

/**The following two functions are obtained from https://blog.jse.li/posts/cloudflare-scrape-shield/#code
 * It is only used to obfuscate an email address and not be secure in any other way.
 * Email obfuscation is temporary.
 */
function hex_at(str, index) {
  const r = str.substr(index, 2);
  return parseInt(r, 16);
}
function decrypt(ciphertext: string) {
  let output = '';
  const key = hex_at(ciphertext, 0);
  for (let i = 2; i < ciphertext.length; i += 2) {
    const plaintext = hex_at(ciphertext, i) ^ key;
    output += String.fromCharCode(plaintext);
  }
  output = decodeURIComponent(escape(output));
  return output;
}

export { continuationUrlDomain, decrypt };
