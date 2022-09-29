import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Input } from "react-daisyui";

const OTP_LENGTH = 8;
let currentOTPid;

const EmailVerification = () => {
    const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
    const [activeOTPi, setActiveOTPi] = useState(0);
    const inputRef = useRef(null);

    const nextInput = (index) => {
        setActiveOTPi(index + 1);
    };
    const prevInput = (index) => {
        let next;
        const difference = index - 1;
        next = difference !== 0 ? diff : 0;
        setActiveOTPi(next);
    };

    const handleOTP = ({ target }) => {
        const { value } = target;
        const newOTP = [...otp];
        newOTP[currentOTPid] = value.substring(value.length - 1, value.length);
        if (!value) prevInput(currentOTPid);
        else nextInput(currentOTPid);
        setOtp([...newOTP]);

        console.log(value);
    };

    const handleKeyDown = ({ key }, index) => {
        currentOTPid = index;
        if (key === "Backspace") prevInput(currentOTPid);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(inputRef);
    };
    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOTPi]);

    return (
        <Card className="flex-shrink-0 w-full shadow-2xl">
            <Card.Body>
                <p className="font-bold uppercase text-center">
                    insert the OTP sent to your inbox
                </p>
                <div className="space-x-5 flex justify-center">
                    {otp &&
                        otp.map((_, index) => (
                            <Input
                                ref={activeOTPi === index ? inputRef : null}
                                key={index}
                                value={otp[index] || ""}
                                className="w-full spin-button-none input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                                type="number"
                                onChange={handleOTP}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                </div>
                <Button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-blue-900 mt-10"
                    onClick={onSubmit}
                >
                    check
                </Button>
            </Card.Body>
        </Card>
    );
};

export default EmailVerification;
