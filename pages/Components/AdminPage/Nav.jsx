import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { useSession, signIn, signOut } from "next-auth/react";
const Nav = () => {
  const router = useRouter();
  console.log(router);
  const { pathname } = router;
  const { data: session } = useSession();
  const disabled_link = " mt-4 m login-font flex   w-full p-4";
  const active_link = "bg-gradient-to-r from-blue-900 " + disabled_link;
  return (
    <div className="flex flex-col ">
      <nav className="mt-6 ">
        <Link href={"/"} className="m-4 mx-6 login-font text-xl">
          E-commerce Admin
        </Link>
        <Link
          href="/products"
          className={
            pathname.includes("/products")
              ? active_link
              : disabled_link + " brightness-50 "
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mx-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
          Products
        </Link>
        <Link
          href={"/orders"}
          className={
            pathname === "/orders"
              ? active_link
              : disabled_link + " brightness-50 "
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mx-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
            />
          </svg>
          Orders
        </Link>
        <Link
          href="/settings"
          className={
            pathname.includes("/settings")
              ? active_link
              : disabled_link + " brightness-50 "
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mx-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
          Settings
        </Link>
      </nav>

      <div class="mt-auto mb-12 h-12  flex login-font">
        <img
          className="rounded-full ml-4"
          src={session?.user?.image}
          width={50}
        />
        <h1 className="m-3">{session?.user?.name}</h1>
      </div>
    </div>
  );
};

export default Nav;
