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
import { buttonAns, frequencies } from "../testpage/TestPageComponents";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

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
        margin-right: 8px;

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

const TestStandardContainer = styled.div(() => `
    width: 100%;
    max-width: 70%;
    background-color: #EFEFEF;
    margin: 20px auto;
    padding: 16px;
    border-radius: 12px;    

    & h2 {
        margin: 0;
    }

    & p {
        margin: 0;
        color: #929292;
        margin: 10px 0;
    }

    @media(max-width: 672px) {
        max-width: 90%;
    }
`);

const ResultAge = styled.p(() => `
    color: #0075FF;
    font-size: 42px;
    font-weight: bold;
    margin: 14px 0;
`);

const TotalScore = styled.p(() => `
    font-size: 24px;
    font-weight: bold;
    margin: 14px 0;
    color: #929292;
`);

const StyledCopyURL = styled.button<{ copied: boolean }>(() => `
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px;
    background-color: #0075FF;  
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    color: #0075FF;
    position: relative;
    margin-left: 8px;

    & svg {
        width: 20px;
        height: 20px;
        margin-right: 2px;
        fill: #FFFFFF;
    }

    @media(max-width: 672px) {
        max-width: 90%;
    }
`);

const CopyUrlContainer = styled.div(() => `
    display: flex;
    width: 100%;
    margin: 20px auto;
    max-width: 70%;
    background-color: #F0F0F0;
    border-radius: 12px;
    padding: 8px;

    & .current-url {
        background-color: #FFFFFF;
        text-align: left;
        border-radius: 10px;
        white-space: nowrap;
        overflow-x: scroll;
        padding: 8px 8px 0 8px;

        & P {
            margin: 0;
            font-weight: bold;
            color: #929292;
        } 
        
        &::-webkit-scrollbar {
            height: 6px;     
        } 

        &::-webkit-scrollbar-thumb {
            border-radius: 12px;
            background-color: #0075FF;
        }

        &::-webkit-scrollbar-track {
            border-radius: 12px;
            opacity: 0;
        }
    }

    & span {
        font-size: 14px;
        color: #FFFFFF;
    }

    @media(max-width: 672px) {
        max-width: 90%;
    }
`);

interface ResultPageComponentsProps {
    name: string;
    resultMessage: string;
    scores: number[];
}

export const ResultPageComponents = <T extends ResultPageComponentsProps>({ name, resultMessage, scores }: T) => {
    const [copied, setCopied] = useState<boolean>(false);
    const [currentUrl, setCurrentUrl] = useState<string>("");

    const labels: string[] = frequencies;
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
                    stepSize: 1,
                    callback: (value: number | {}) => {
                        if (value === 0) {
                            return buttonAns[2].label;
                        } else if (value === 1) {
                            return buttonAns[1].label;
                        } else if (value === 2) {
                            return buttonAns[0].label;
                        } else {
                            return '';
                        }
                    },
                },
            },
        },
    };

    const calculateTotalScore: number = scores.map(e => Number(e)).reduce((acc, curr) => acc + curr, 0);
    const nameResult = decodeURIComponent(name);

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const copyUrlToClipboard = (): void => {
        const fullUrl: string = window.location.href;
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
    };


    return (
        <StyledContent>
            <div className="contents-container">
                <img src="/result.png" width={200} />
                <h1>{nameResult}님의<br /> 청력 테스트 결과는?</h1>
                <ResultAge>{decodeURIComponent(resultMessage)}대</ResultAge>
                <TotalScore>총점: {calculateTotalScore}점</TotalScore>
                <p>주파수를 통해 여러분의 귀를 나이별로 분석해봅니다.</p>
                <Line data={data} options={options} />
                <h2>결과 링크 공유하기</h2>
                <CopyUrlContainer>
                    <div className="current-url">
                        <p>{currentUrl}</p>
                    </div>
                    <StyledCopyURL onClick={copyUrlToClipboard} copied={copied}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
                            <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
                        </svg>
                        <span>Copy</span>
                    </StyledCopyURL>
                </CopyUrlContainer>
                <ResetBtnContainer>
                    <Link href='/'>
                        <ResetBtn>
                            <svg xmlns="http://www.w3.org/2000/svg" width="855" height="854" viewBox="0 0 855 854" fill="none">
                                <path d="M431.8 0.666656C325.133 0.666656 222.733 43.3333 145.933 111.6L137.4 43.3333C137.4 17.7333 116.067 0.66666 90.4667 4.93333C64.8667 4.93333 47.8 26.2667 52.0667 51.8667L60.6 167.067C64.8667 222.533 111.8 265.2 167.267 265.2H175.8L291 256.667C316.6 256.667 333.667 235.333 329.4 209.733C329.4 184.133 308.067 167.067 282.467 171.333L197.133 175.6C261.133 120.133 342.2 86 427.533 86C615.267 86 768.867 239.6 768.867 427.333C768.867 615.067 615.267 768.667 427.533 768.667C239.8 768.667 86.2 615.067 86.2 427.333C86.2 401.733 69.1333 384.667 43.5333 384.667C17.9333 384.667 0.866668 401.733 0.866669 427.333C0.866669 662 192.867 854 427.533 854C662.2 854 854.2 662 854.2 427.333C858.467 192.667 666.467 0.666655 431.8 0.666656Z" fill="black" />
                            </svg>
                            다시하기
                        </ResetBtn>
                    </Link>
                </ResetBtnContainer>
                <TestStandardContainer>
                    <h2>테스트 기준</h2>
                    <p>50점 이상: 10대</p>
                    <p>49점 ~ 41점: 20대</p>
                    <p>40점 ~ 31점: 30대</p>
                    <p>30점 ~ 21점: 40대</p>
                    <p>20점 ~ 11점: 50대</p>
                    <p>10점 ~ 6점: 60대</p>
                    <p>5점 이하: 70대 이상</p>
                </TestStandardContainer>
            </div>
        </StyledContent>
    );
};


