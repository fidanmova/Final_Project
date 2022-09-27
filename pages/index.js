import Head from "next/head";
import Image from "next/image";

export default function Home() {
    return (
        <div className="w-screen h-screen bg-cyan-100 text-white">
            <Head>
                <title>Dev-Shed</title>
                <meta name="description" content="Dev-Shed Community" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="">Dev shed</main>

            <footer className=""></footer>
        </div>
    );
}
