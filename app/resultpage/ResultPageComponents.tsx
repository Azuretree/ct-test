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
import styled from "@emotion/styled";

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

const ResetBtn = styled.button(() => `
    width: 100%;
    max-width: 100%;
    background-color: #0075FF;  
    color: #FFFFFF;
    border: none;
    border-radius: 12px;
    padding: 14px;
    margin: 0 auto;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    display: inline-block;  
    text-decoration: none;  
    text-align: center; 
    
    & svg {
        position: relative;
        top: 2px;
        width: 16px;
        height: 16px;
        margin-left: 8px;

        & path {
            fill: #FFFFFF;
        }
    }
`);

const ResetBtnContainer = styled.div(() => `
    width: 100%;
    max-width: 320px;
    margin: 20px auto;
`);

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
                fill: false,
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
                <img src="/result.png" width={200} />
                <h1>{`${decodeURIComponent(testerName)} 님의 청력 테스트 결과는?`}</h1>
                <h2>{decodeURIComponent(resultMessage)}</h2>
                <p>주파수를 통해 여러분의 귀를 나이별로 분석해봅니다.</p>
                <Line data={data} options={options} />
                <ResetBtnContainer>
                    <Link href='/'>
                        <ResetBtn>
                            다시하기
                            <svg xmlns="http://www.w3.org/2000/svg" width="855" height="854" viewBox="0 0 855 854" fill="none">
                                <path d="M431.8 0.666656C325.133 0.666656 222.733 43.3333 145.933 111.6L137.4 43.3333C137.4 17.7333 116.067 0.66666 90.4667 4.93333C64.8667 4.93333 47.8 26.2667 52.0667 51.8667L60.6 167.067C64.8667 222.533 111.8 265.2 167.267 265.2H175.8L291 256.667C316.6 256.667 333.667 235.333 329.4 209.733C329.4 184.133 308.067 167.067 282.467 171.333L197.133 175.6C261.133 120.133 342.2 86 427.533 86C615.267 86 768.867 239.6 768.867 427.333C768.867 615.067 615.267 768.667 427.533 768.667C239.8 768.667 86.2 615.067 86.2 427.333C86.2 401.733 69.1333 384.667 43.5333 384.667C17.9333 384.667 0.866668 401.733 0.866669 427.333C0.866669 662 192.867 854 427.533 854C662.2 854 854.2 662 854.2 427.333C858.467 192.667 666.467 0.666655 431.8 0.666656Z" fill="black" />
                            </svg>
                        </ResetBtn>
                    </Link>
                </ResetBtnContainer>
            </div>
        </StyledContent>
    );
};


