import { NextPage } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Next Open Jira</title>
      </Head>
      <main className={inter.className}>
        <h1 className="text-lg">Next Open Jira</h1>
      </main>
    </>
  );
};

export default HomePage;
