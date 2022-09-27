import Head from "next/head";
import Hero from "../components/home/HomeHero";

export default function Home() {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-back bg-cover bg-no-repeat bg-bottom  bg-opacity-10 text-white">
            <Head>
                <title>Dev-Shed</title>
                <meta name="description" content="Dev-Shed Community" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="">
                <Hero />
            </main>

            <footer className=""></footer>
        </div>
    );
}
