import React from "react";
import { Button, Card, Form, Input } from "react-daisyui";
import { useForm } from "react-hook-form";

const Login = ({ setForm }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

    return (
        <Card className="flex-shrink-0 w-full max-w-sm shadow-2xl ">
            <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Label title="Email" />
                    <Input
                        type="text"
                        placeholder="email"
                        className="input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                    />
                </Form>
                <Form>
                    <Form.Label title="Password" />
                    <Input
                        type="text"
                        placeholder="password"
                        className="input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                    />
                    <div className="flex justify-between pt-4">
                        <label
                            className="label"
                            onClick={() => setForm("reset")}
                        >
                            <p className="text-xs">Forgot password?</p>
                        </label>
                        <label
                            className="label"
                            onClick={() => setForm("register")}
                        >
                            <p className="text-xs">Not a member?</p>
                        </label>
                    </div>
                </Form>

                <Button className="bg-gradient-to-r from-indigo-500 to-blue-900 mt-10">
                    Login
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Login;
