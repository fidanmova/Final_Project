import Link from "next/link";
import { Button, Card } from "react-daisyui";

const DashCard = ({ title, text, style}) => {
    
    return (
        <Card className={`bg-black/70 w-[42vw] lg:w-[30vw] h-[35vh] m-1 text-sm border-blue-500/50 hover:scale-95 shadow-md ${style}`}>
            <div className="w-full h-full flex flex-col justify-between items-center py-8">
                <h2 className={`text-2xl ${style}`}>{title}</h2>

                <p className="text-md capitalize text-white">{text}</p>
                <Link href={`/${title}`}>enter</Link>
            </div>
        </Card>
    );
};
export default DashCard;
