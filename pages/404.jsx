import Link from "next/link";
import PageTemplate from "../components/ui/PageTemplate";

export default function HomePage() {
    return (
        <PageTemplate content="Dev-Shed Community" title="DevShed - Home">
            <div className="w-full h-[30vh] flex flex-col justify-center items-center space-y-10 bg-black/50">
                <h1 className="text-6xl">OPS...Are you LOST?</h1>
                <Link href="/">HOME</Link>
            </div>
        </PageTemplate>
    );
}
