import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FPSStats from "react-fps-stats";
import Canvas from "../components/Canvas";
export const siteTitle = "Studio Shapes";

export default function Layout({ children, home, noHeader }) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="min-h-screen">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/*
        <FPSStats />
        */}

        {/* Load the navbar */}
        <Navbar />

        <div id="container">
          <Canvas></Canvas>
        </div>

        <header className="mb-10 pb-5 pt-5 text-center">
          {home ? (
            <>
              {/* homepage header */}
              <h5 className="mt-8 text-indigo-500 text-lg font-light dark:text-white">
                Shaping the digital
              </h5>
              <h1 className="mb-6 text-5xl font-bold dark:text-white">
                Shapes Studio
              </h1>
              <div className="relative rotate-90 top-0 z-0">
                {/* SVG Symbol
                <Image
                  className="animate-spin absolute right-0 w-1/2"
                  src="/svg/symbol.svg"
                  height={150}
                  width={150}
                />
                */}
              </div>
            </>
          ) : noHeader ? (
            <>{/* no page header */}</>
          ) : (
            <>
              {/* standard page header */}
              <h4 className="dark:text-white">Page Header</h4>
            </>
          )}
        </header>

        <main className="text-center relative z-10 space-y-10 sm:space-y-12 lg:space-y-20 xl:space-y-24">
          {/* Get the content */}
          {children}
        </main>

        {/* All pages expect the homepage */}
        {!home && <div></div>}

        {/* Load the footer */}
        <Footer />
      </div>
    </>
  );
}
