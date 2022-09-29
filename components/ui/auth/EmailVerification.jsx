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

    const onSubmit = () => {
        router.push("/home");
        console.log(inputRef);
    };
    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOTPi]);

    return (
        <Card className="flex-shrink-0 w-full shadow-2xl border-4 border-myPurple">
            <Card.Body>
                <div className="space-x-5 flex justify-center">
                    {otp &&
                        otp.map((_, index) => (
                            <Input
                                ref={activeOTPi === index ? inputRef : null}
                                key={index}
                                value={otp[index] || ""}
                                className="w-full input-bordered bg-transparent border-yellow-500 focus:border-4"
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
