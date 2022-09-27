import Head from "next/head";

import { Button, Card } from "react-daisyui";

export default function Home() {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-800 text-white">
            <Head>
                <title>Dev-Shed</title>
                <meta name="description" content="Dev-Shed Community" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="">Dev shed</main>
            <Card>
                <Card.Image
                    src="https://api.lorem.space/image/shoes?w=400&h=225"
                    alt="Shoes"
                />
                <Card.Body>
                    <Card.Title tag="h2">Shoes!</Card.Title>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <Card.Actions className="justify-end">
                        <Button color="primary">Buy Now</Button>
                    </Card.Actions>
                </Card.Body>
            </Card>

            <footer className=""></footer>
        </div>
    );
}
