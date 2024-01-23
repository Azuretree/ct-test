"use client"

import { useState } from "react";
import Link from "next/link";
import StyledContent from "../style";
import { useSearchParams } from "next/navigation";
import styled from "@emotion/styled";

const WrapTestContainer = styled.div(() => `
    display: flex;
    text-align: center;
    margin: 0 auto;
    max-width: 60%;
    width: 100%;
    min-height: 100%;
    height: 100%;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: space-between;

    & audio {
        margin: 20px auto;
        width: 100%;
        max-width: 400px;
        outline: none;
    }

    @media(max-width: 672px) {
        max-width: 90%;
    }
`);

const CurrentFrequency = styled.p(() => `
    font-size: 36px;
    margin: 0;
    font-weight: bold;

    @media(max-width: 672px) {
        font-size: 30px; 
    }
`);

const WrapSelectBtnContainer = styled.div<{ enabled: boolean }>(({ enabled }) => `
    display: grid;
    gap: 16px;

    & button {
        padding: 14px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 12px;
        border: none;
        font-weight: bold;
        cursor: ${enabled ? 'not-allowed' : 'pointer'};
    }
`);

const GreenButton = styled.button<{ enabled: boolean }>(({ enabled }) => `
    background-color: #00D008;
    color: #FFFFFF;
    opacity: ${enabled ? .5 : 1};
`);

const GrayButton = styled.button<{ enabled: boolean }>(({ enabled }) => `
    background-color: #C3C3C3;
    color: #535353;
    opacity: ${enabled ? .5 : 1};
`);

const RedButton = styled.button<{ enabled: boolean }>(({ enabled }) => `
    background-color: #FF5C5C;
    color: #FFFFFF;
    opacity: ${enabled ? .5 : 1};
`);

const ResultBtn = styled.button(() => `
    width: 100%;
    max-width: 1-0%;
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
        width: 16px;  // Adjust the width as needed
        height: 16px; // Adjust the height as needed
        margin-left: 8px; // Add margin as needed to separate text and icon
    }
`);

const ResultBtnContainer = styled.div(() => `
    margin: 20px auto;
    width: 100%;
    max-width: 50%;

    @media(max-width: 672px) {
        max-width: 80%;
    }
`);

const LeftTestPage = () => {
    const [enabled, setEnabled] = useState<boolean>(false);

    const params = useSearchParams();
    const name = params.get('name');

    const [currentFrequencyIndex, setCurrentFrequencyIndex] = useState<number>(0);
    const [totalScore, setTotalScore] = useState<number>(0);
    const [showResultsButton, setShowResultsButton] = useState<boolean>(false);
    const [resultMessage, setResultMessage] = useState<string>(''); // Move resultMessage to component state

    const frequencies: string[] = ['(왼쪽) 125', '(오른쪽) 125', '(왼쪽) 250', '(오른쪽) 250', '(왼쪽) 500', '(오른쪽) 500',
        '(왼쪽) 1000', '(오른쪽) 1000', '(왼쪽) 2000', '(오른쪽) 2000', '(왼쪽) 4000', '(오른쪽) 4000',
        '(왼쪽) 8000', '(오른쪽) 8000'
    ];

    const buttonAns = [
        { label: '네, 잘들려요', score: 2, style: GreenButton },
        { label: '잘 모르겠어요.', score: 1, style: GrayButton },
        { label: '아니요, 잘 안들려요.', score: 0, style: RedButton },
    ];

    const handleButtonClick = (score: number) => {
        // 다음 주파수로 이동
        if (currentFrequencyIndex < frequencies.length - 1) {
            setCurrentFrequencyIndex(currentFrequencyIndex + 1);
            setTotalScore((prevScore) => prevScore + score);
            setEnabled(false);
        } else {
            const finalScore = totalScore + score;
            determineResult(finalScore);
            setShowResultsButton(true);
            setEnabled(true);
        }
    };

    const determineResult = (finalScore: number) => {
        if (finalScore >= 25) {
            setResultMessage('10대');
        } else if (finalScore > 20) {
            setResultMessage('20대');
        } else if (finalScore > 15) {
            setResultMessage('30대');
        } else if (finalScore > 10) {
            setResultMessage('40대');
        } else if (finalScore > 6) {
            setResultMessage('50대');
        } else if (finalScore > 2) {
            setResultMessage('60대');
        } else {
            setResultMessage('70대');
        }
    };

    console.log(totalScore, resultMessage)

    return (
        <StyledContent>
            <WrapTestContainer>
                <p>{currentFrequencyIndex + 1} / {frequencies.length}</p>
                <h2>현재 주파수가 잘 들리나요?</h2>
                <CurrentFrequency>{frequencies[currentFrequencyIndex]}Hz</CurrentFrequency>
                <audio controls autoPlay loop>
                    <source src="/test.mp3" type="audio/mp3" />
                </audio>
                <WrapSelectBtnContainer enabled={enabled}>
                    {buttonAns.map((response, index) => (
                        <response.style
                            key={index}
                            onClick={() => {
                                handleButtonClick(response.score);
                            }}
                            disabled={showResultsButton || enabled}
                            enabled={enabled}
                        >
                            {response.label}
                        </response.style>
                    ))}
                </WrapSelectBtnContainer>
                <ResultBtnContainer>
                    {showResultsButton && (
                        <Link href={{
                            pathname: '/resultpage',
                            query: { name, resultMessage: encodeURIComponent(resultMessage) }
                        }}>
                            <ResultBtn>
                                결과 보기
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 20 16" fill="none">
                                    <path d="M1 8L19 8M19 8L12.25 15M19 8L12.25 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </ResultBtn>
                        </Link>
                    )}
                </ResultBtnContainer>
            </WrapTestContainer>
        </StyledContent>
    );
};

export default LeftTestPage;
