import Head from "next/head";
import Header from "../components/ui/Header";
import LandingHero from "../components/landing/LandingHero";

export default function Home() {
    return (
        <div className="w-screen h-screen flex flex-col justify-between items-center bg-home bg-cover bg-right-bottom text-white font-poppins">
            <Head>
                <title>Dev-Shed</title>
                <meta name="description" content="Dev-Shed Community" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="w-full">
                <LandingHero />
            </main>

            <footer className=""></footer>
        </div>
    );
}
