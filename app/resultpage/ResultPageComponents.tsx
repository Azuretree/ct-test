"use client"

import Link from "next/link";
import StyledContent from "../style";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { frequencies } from "../testpage/TestPageComponents";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const ResultPageComponents = ({ testerName, resultMessage, scores }: {
    testerName: string,
    resultMessage: string,
    scores: number[],
}) => {

    const labels = frequencies;
    console.log(scores)
    const data = {
        labels,
        datasets: [
            {
                label: '주파수 버튼 응답 기록',
                data: scores,
                borderColor: '#3182ce',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        elements: {
            line: {
                tension: 0,
                borderWidth: 1.5,
            },
            point: { radius: 4 },
        },
        scales: {
            y: {
                ticks: {
                    callback: (value: number | any) => value,
                },
            },
        },
    };

    return (
        <StyledContent>
            <div className="contents-container">
                <h1>{`${testerName} 님의 청력 테스트 결과는?`}</h1>
                <h2>{resultMessage}</h2>
                <p>주파수를 통해 여러분의 귀를 나이별로 분석해봅니다.</p>
                <Line data={data} options={options} />
                <Link href='/'>
                    <button>다시하기</button>
                </Link>
            </div>
        </StyledContent>
    );
};


