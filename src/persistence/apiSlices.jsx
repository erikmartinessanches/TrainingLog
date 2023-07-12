/* import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { firebaseApp } from "../models/store";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
export const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Auth"], //Optional, https://redux-toolkit.js.org/rtk-query/api/createApi#tagtypes
  endpoints: (builder) => ({
    authenticateWithFirebase: builder.mutation({
      async queryFn({ email, password, usingAsSignUp }) {
        //debugger;
        try {
          const auth = getAuth(firebaseApp);
          const userCredential = usingAsSignUp ? 
          await createUserWithEmailAndPassword(auth, email, password) : 
          await signInWithEmailAndPassword(auth, email, password);
          //debugger;
          return {
            data: {
              uid: userCredential?.user?.uid,
              email: userCredential?.user?.email,
              usingAsSignUp: usingAsSignUp,
            },
          };
        } catch (e) {
          return { error: e };
        }
      },
      providesTags: ["Auth"], //Optional, https://redux-toolkit.js.org/rtk-query/api/createApi#providestags
      //also see https://www.youtube.com/watch?v=yptCv1xOi-Y&t=459s how to invalidate tags
    }),
  }),
});

export const { useAuthenticateWithFirebaseMutation } = firebaseApi; */
