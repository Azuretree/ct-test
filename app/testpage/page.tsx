import React from "react";
import { TestPageComponents } from "./TestPageComponents";

const TestPage = ({ searchParams }: any) => {

    console.log(searchParams)

    return (
        <>
            <p>{searchParams.name}</p>
            <TestPageComponents />
        </>
    );
};

export default TestPage;
