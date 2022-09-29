import React from "react";
import Head from "next/head";
import Header from "../Header";
import Footer from "../Footer";

const PageTemplate = ({ children, content, title }) => {
    return (
        <div className="w-screen h-screen flex flex-col justify-between items-center bg-home bg-cover bg-right-bottom text-white font-poppins">
            <Head>
                <title>{title}</title>
                <meta name="description" content={content} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="w-full">{children}</main>

            <Footer />
        </div>
    );
};

export default PageTemplate;
