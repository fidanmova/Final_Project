import React from "react";
import Image from "next/image";
import Link from "next/link";
const Header = ({user}) => {
    console.log('NAVBARuser', user)
    return (
        <div className="w-screen h-16 sticky top-0 z-50 flex justify-between items-center px-6">
            <Link href="/">
                <Image
                    src="/logo.svg"
                    alt="logo"
                    width={"150px"}
                    height={"68px"}
                    className="relative m-6"
                />
            </Link>
        {user && <p>{user}</p>}
        

        </div>
    );
};

export default Header;
