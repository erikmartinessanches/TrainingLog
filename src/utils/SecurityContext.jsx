/**This is for making the SecurityProvider available to all children of
 * SecurityContext.
 */
import React from "react";
const SecurityContext = React.createContext({});
export default SecurityContext;
