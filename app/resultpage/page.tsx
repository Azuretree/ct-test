import React from "react";
import { ResultPageComponents } from "./ResultPageComponents";
import { redirect } from "next/navigation";

const ResultPage = ({ searchParams }: {
    searchParams: {
        name?: string,
        resultMessage?: string
        scores?: number[]
    }
}) => {
    const { name, resultMessage, scores } = searchParams;
    if (!name || !resultMessage) redirect("/");

    return (
        <>
            <ResultPageComponents testerName={name} resultMessage={resultMessage} scores={scores as number[]} frequencies={[]} />
        </>
    );
};

export default ResultPage;

