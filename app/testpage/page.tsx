import React from "react";
import { TestPageComponents } from "./TestPageComponents";

const TestPage = ({ searchParams }: any) => {

    const yourName = searchParams.name;

    console.log(yourName)

    return (
        <>
            <TestPageComponents />
        </>
    );
};

export default TestPage;
