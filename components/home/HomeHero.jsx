import Link from "next/link";
import React from "react";
import { Button, Card, Form, Input, Hero } from "react-daisyui";

const HomeHero = () => {
    return (
        <Hero className="bg-black bg-opacity-30 border border-green-400 rounded-lg">
            <Hero.Content className="flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <Card className="flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <Card.Body>
                        <Form>
                            <Form.Label title="Email" />
                            <Input
                                type="text"
                                placeholder="email"
                                className="input-bordered"
                            />
                        </Form>
                        <Form>
                            <Form.Label title="Password" />
                            <Input
                                type="text"
                                placeholder="password"
                                className="input-bordered"
                            />
                            <label className="label">
                                <Link href="/forgot_password" className="text-black">
                                    Forgot password?
                                </Link>
                            </label>
                        </Form>
                        <Form className="mt-6">
                            <Button className="bg-green-800">Login</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Hero.Content>
        </Hero>
    );
};

export default HomeHero;
