import { Inter } from 'next/font/google';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
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
}
