import React from "react";
import { Button } from "react-daisyui";

const SubmitButton = ({ onSubmit, title }) => {
    return (
        <Button
            className="bg-gradient-to-r from-blue-900 to-purple-900  mt-10"
            type="submit"
        >
            {title}
        </Button>
    );
};

export default SubmitButton;
