//use client
"use client";

import Link from "next/link";
import Image from "next/image";
import {useState, useEffect} from "react";
import {signIn, signOut,useSession, getProviders} from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;

  // initialize google signin
  const [providers, setProviders] = useState(null);

  // useState on opening mobile menu
  const [toggleDropdown,SetToggleDropdown] = useState(false);

  useEffect (() =>{
    const setProviders = async () =>{
      const response = await getProviders;

      setProviders(response);
    }
    setProviders();
  },[])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          // src="/assets/images/logo.svg" 
          src="/assets/images/logo-ko.png" 
          alt="logo" 
          width={100} 
          height={30}
          className="object-contain"
        />
        {/*<p className="logo_text"> Rapid API </p>*/}
      </Link>
      {/* DESKTOP NAV */}
      <div className="sm:flex hidden">
        {/* state when user is login */}
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button 
              type="button" 
              onClick={signOut}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image 
                src="/assets/images/profile.png" 
                alt="profile-image" 
                width={37} 
                height={37} 
                className="rounded-full"
              />
            </Link>
          </div>
        ):(
          // false when not login
          <>
            {providers && 
              Object.values(providers).map((provider) =>(
                <button
                  type="button"
                  key={provider.name}
                  onClick={()=>signIn(provider.id)}
                  className="black_btn"                
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* MOBILE NAV */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn 
          ? (
            <div className="flex">
              <Image 
                src="/assets/images/profile.png" 
                alt="profile-image" 
                width={37} 
                height={37} 
                className="rounded-full"
                onClick={() => SetToggleDropdown((prev) => !prev )}
              />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => SetToggleDropdown(false)}
                
                >
                </Link>
              </div>
            )}

            </div>
          ):(
            <>
            {providers && 
              Object.values(providers).map((provider) =>(
                <button
                  type="button"
                  key={provider.name}
                  onClick={()=>signIn(provider.id)}
                  className="black_btn"                
                >
                  Sign In
                </button>
              ))}
            </>
          )}
      </div>
    </nav>
  )
}

export default Nav;