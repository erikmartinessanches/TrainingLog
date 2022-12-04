export const reducer = (state, action) => {
  if (action.type === "SIGNUP_RESULTS") {
    return { ...state, user: { ...action.payload } };
  } else if (action.type === "LOGIN_RESULTS") {
    return { ...state, user: { ...action.payload } };
  } else if (action.type === "LOGOUT_RESULTS") {
    return { ...state, user: null };
  } else if (action.type === "RECORD_CREATED") {
    return { ...state, records: [...state.records, action.payload] };
  }
  return { ...state };
};

/** We create a new copy with the spread syntax. Spread syntax {... yo} used
 * here, works for both arrays and objects and is thus preferable. This has no
 * side effects since everything returned is "spread" with the spread syntax.
 * A function with no side effects is a pure function.
 *
 * "In general, we want functions to calculate their results (i) based solely on
 *  the arguments, not e.g. based on global variables! (ii) leaving the contents
 * of object arguments unchanged, and (iii) creating new objects or returning
 * primitive values ​​as function results. This basically simulates that objects
 * are also passed (as function arguments and results) by value, just like
 * primitive types (numbers, strings)."
 *
 * "The strategy of creating a new object for every data processing is safer,
 * because it ensures that there will be be no shared objects! The reducers above
 * create a new object, with a slightly different content."
 * */
