import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
            <Html>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap"
                        rel="stylesheet"
                    />
                    <script
                        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDz94hT1k-jq_HG7g219tPBHX4LijpumIs&callback=initMap&v=weekly"
                        defer
                    ></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
