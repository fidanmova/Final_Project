import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Input } from "react-daisyui";
import { toast } from "react-toastify";
import { useCurrentUser } from "../../../utils/user/hooks";

const OTP_LENGTH = 8;
let currentOTPid;

const EmailVerification = ({ OTP, credentials }) => {
    // console.log("credentials", credentials);
    const { mutate } = useCurrentUser();

    const router = useRouter();
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

        //console.log(value);
    };

    const handleKeyDown = ({ key }, index) => {
        currentOTPid = index;
        if (key === "Backspace") prevInput(currentOTPid);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const otpInput = otp.join("");

        if (otpInput == OTP) {
            mutate({ user: credentials }, false);
            router.push("/dashboard");
            toast.success(
                `Hi ${credentials.username} welcome to the DEVSHED community`
            );
        } else {
            toast.error("OTP input is invalid...Try again.");
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [activeOTPi]);

    return (
        <Card className="w-11/12 lg:flex-shrink-0 lg:w-full shadow-2xl border-4 border-myPurple">
            <Card.Body>
                <div className="w-full space-x-1 lg:space-x-5 flex justify-center  text-blue-600">
                    {otp &&
                        otp.map((_, index) => (
                            <Input
                                ref={activeOTPi === index ? inputRef : null}
                                key={index}
                                value={otp[index] || ""}
                                className="w-full input-bordered bg-transparent border-yellow-500 focus:border-pink-500 focus:border lg:focus:border-4"
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
