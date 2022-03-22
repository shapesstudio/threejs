import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      {/*
      <div className="relative w-full max-width-lg z-0">
        <div className="absolute mix-blend-multiply filter blur-xl top-0 -left-4 w-72 h-72 bg-purple-300 bg-opacity-75 dark:bg-green-400 rounded-full"></div>
        <div className="absolute mix-blend-multiply filter blur-xl top-0 -right-4 w-72 h-72 bg-yellow-300 bg-opacity-75 dark:bg-indigo-500 rounded-full"></div>
        <div className="absolute mix-blend-multiply filter blur-xl top-10 left-40 w-72 h-72 bg-pink-300 bg-opacity-75 dark:bg-yellow-300 rounded-full"></div>
      </div>
       */}

      <section className="w-1/2 mx-auto">
        <p className="font-light">
          That’s it! We now have the polished layout code in place to move onto
          our data fetching lessons. Before we wrap up this lesson, let’s talk
          about some helpful techniques related to Next.js’s CSS support on the
          next page.
        </p>

        <Link href={"/cases/"}>
          <a>Cases</a>
        </Link>
      </section>

      <div className="grid gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <img
        className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-1-min.jpg"
        />
        <img
          className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-2-min.jpg"
        />
        <img
          className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-3-min.jpg"
        />
        <img
        className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-4-min.jpg"
        />
        <img
          className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-5-min.jpg"
        />
        <img
          className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-6-min.jpg"
        />
        <img
          className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-7-min.jpg"
        />
        <img
          className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-8-min.jpg"
        />
        <img
          className="w-full aspect-square"
          height="400"
          width="200"
          src="/images/picture-9-min.jpg"
        />
        <img
        className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-10-min.jpg"
        />
        <img
        className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-1-min.jpg"
        />
        <img
          className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-2-min.jpg"
        />
        <img
          className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-3-min.jpg"
        />
        <img
        className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-4-min.jpg"
        />
        <img
          className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-5-min.jpg"
        />
        <img
          className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-6-min.jpg"
        />
        <img
          className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-7-min.jpg"
        />
        <img
          className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-8-min.jpg"
        />
        <img
          className="w-full aspect-square"
          height="400"
          width="200"
          src="/images/picture-9-min.jpg"
        />
        <img
        className="w-full aspect-square"
          height="400"
          width="400"
          src="/images/picture-10-min.jpg"
        />
      </div>
    </Layout>
  );
}
