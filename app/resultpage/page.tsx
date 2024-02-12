import React from "react";
import { ResultPageComponents } from "./ResultPageComponents";
import { redirect } from "next/navigation";

interface ResultPageProps {
    searchParams: {
        name: string,
        resultmessage: string,
        scores: number[]
    }
}

const ResultPage = <T extends ResultPageProps>({ searchParams }: T) => {
    const { name, resultmessage, scores } = searchParams;
    if (!name || !resultmessage) {
        redirect("/");
    }

    return (
        <>
            <ResultPageComponents name={name} resultMessage={resultmessage} scores={scores} />
        </>
    );
};

export default ResultPage;

