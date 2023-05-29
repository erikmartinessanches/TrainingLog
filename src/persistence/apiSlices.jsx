import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { firebaseApp } from "../models/store";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    signUpWithFirebase: builder.mutation({
      async queryFn(/*auth,*/ { email, password }) {
        try {
          //const  = args;
          const auth = getAuth(firebaseApp);
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          debugger;
          return {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            usingAsSignUp: true,
          };
        } catch (e) {
          return { error: e };
        }
      },
    }),
  }),
});

export const { useSignUpWithFirebaseMutation } = firebaseApi;
