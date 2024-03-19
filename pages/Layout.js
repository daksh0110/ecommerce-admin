import React, { Children } from "react";

import SignupFrom from "./Components/LoginPage/SignupFrom";
import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "./Components/AdminPage/Nav";
import Googleicon from "./Components/LoginPage/Googleicon";
export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div class=" login-font  h-screen flex items-center justify-center bg-gray-800">
        <div className="  flex flex-row  ">
          <div className=" bg-white w-full rounded-l-3xl text-black ">
            <div className="m-6  ">
              <div className=" text-center text-4xl mt-12 ">
                <h1>Sign In</h1>
              </div>
              <div className="flex container p-2 justify-center mt-4 ">
                <Googleicon />
              </div>

              <p className="pt-1 text-center text-sm">
                Or sign in using E-Mail Address
              </p>
              <SignupFrom />
              <div className="w-1/2 p-4 mx-auto text-center ">
                <button className="p-3 border rounded-3xl px-10 light-blue">
                  Sign IN
                </button>
              </div>
            </div>
          </div>

          <div className=" light-blue w-full rounded-r-2xl items-center justify-center ">
            <div className="m-6 ">
              <div className=" text-center text-5xl  mt-24  text-white">
                Create,
                <br />
                Account!
              </div>
              <p className="pt-2 text-center mt-4 text-sm  text-white">
                Sign up if you still don't have an account...
              </p>

              <div className="w-1/2 p-4 mx-auto text-center mt-4  ">
                <button className="p-3 border rounded-3xl px-10  text-white">
                  Sign UP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="light-blue h-screen w-screen flex">
      <Nav />

      <div className="bg-white w-2/4 flex-grow mt-4 mb-4 mr-4 rounded-2xl">
        <div className="text-black m-2">{children}</div>
      </div>
    </div>
  );
}
