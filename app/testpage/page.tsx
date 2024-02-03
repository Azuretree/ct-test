import React from "react";
import { TestPageComponents } from "./TestPageComponents";
import { redirect } from "next/navigation";

const TestPage = ({ searchParams }: any) => {

    const testerName: string = searchParams.name;
    if (!testerName) redirect("/");

    return (
        <>
            <TestPageComponents testerName={testerName} />
        </>
    );
};

export default TestPage;
