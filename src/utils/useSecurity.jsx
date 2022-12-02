/**This is my custom hook useSecurity. To allow any component inside
 * SecurityProvider to access the authentication functions in SecurityProvider,
 * I've made a custom hook useSecurity. */
import { React, useContext } from "react";
import SecurityContext from "./SecurityContext";

const useSecurity = () => useContext(SecurityContext);

export default useSecurity;
