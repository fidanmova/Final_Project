import React from "react";
import Head from "next/head";
import Header from "../Header";
import Footer from "../Footer";

const PageTemplate = ({ children, content, title }) => {
    return (
        <div className="w-screen h-screen flex flex-col justify-between items-center bg-home bg-cover bg-right-bottom bg-repeat-y lg:bg-no-repeat text-white font-poppins snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin lg:scrollbar scrollbar-track-[#fcdef8] scrollbar-thumb-[#242424]/80 ">
            <Head>
                <title>{title}</title>
                <meta name="description" content={content} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="w-screen h-16 sticky top-0 z-50 flex justify-between items-center px-6 bg-black bg-opacity-50">
                <Header />
            </div>
            <main className="w-full">{children}</main>

            <Footer />
        </div>
    );
};

export default PageTemplate;
