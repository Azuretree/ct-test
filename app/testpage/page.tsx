import React from "react";
import { TestPageComponents } from "./TestPageComponents";
import { redirect } from "next/navigation";

const TestPage = ({ searchParams }: any) => {

    const testerName: string = searchParams.name;
    const hasChecked = searchParams.checked;
    if (!testerName || hasChecked === 'false') redirect("/");

    return (
        <>
            <TestPageComponents testerName={testerName} />
        </>
    );
};

export default TestPage;
