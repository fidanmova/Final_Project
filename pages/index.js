import Head from "next/head";

export default function Home() {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-800 text-white">
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
