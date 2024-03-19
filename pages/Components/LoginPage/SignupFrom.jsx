import React from "react";

const SignupFrom = () => {
  return (
    <form class=" mt-2">
      <input
        type="email"
        id="email"
        placeholder="Your email"
        className=" border rounded-3xl p-3 w-full bg-gray-200 "
      />
      <input
        type="password"
        id="password"
        placeholder="password"
        className=" mt-4 border rounded-3xl p-3 w-full bg-gray-200 "
      />

      <div className="text-center mt-6">
        {" "}
        <a href="/" className=" underline text-blue-400">
          Forgot your password?
        </a>
      </div>
    </form>
  );
};

export default SignupFrom;
