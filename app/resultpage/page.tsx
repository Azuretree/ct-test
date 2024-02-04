import React from "react";
import { ResultPageComponents } from "./ResultPageComponents";
import { redirect } from "next/navigation";

const ResultPage = ({ searchParams }: {
    searchParams: {
        name: string,
        resultmessage: string,
        scores: number[]
    }
}) => {
    const { name, resultmessage, scores } = searchParams;
    if (!name || !resultmessage) {
        redirect("/");
    }

    console.log(name, resultmessage, scores);

    return (
        <>
            <ResultPageComponents name={name} resultMessage={resultmessage} scores={scores} />
        </>
    );
};

export default ResultPage;

