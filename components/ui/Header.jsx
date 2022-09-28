import React from "react";
import Image from "next/image";
const Header = () => {
    return (
        <div className="w-screen h-16 sticky top-0 z-50 flex justify-between items-center px-6">
            <Image
                src="/logo.svg"
                alt="logo"
                width={"150px"}
                height={"68px"}
                className="relative m-6"
            />
        </div>
    );
};

export default Header;
