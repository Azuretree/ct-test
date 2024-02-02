"use client";

import styled from "@emotion/styled";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import StyledContent from "../style";

export const CommonButtonStyles = `
    padding: 14px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 12px;
    font-weight: bold;
`;

export const WrapTestContainer = styled.div(
    () => `
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

    .progress-bar-container {
        width: 100%;
        height: 10px;
        background-color: #EDEDED; /* 프로그레스 바 컨테이너의 배경 색 */
        border-radius: 5px;
        margin-top: 10px;
    }

    .progress-bar {
        height: 100%;
        border-radius: 5px;
        background-color: #0075FF; /* 검은색 프로그레스 바 */
        transition: width 0.2s ease; /* 프로그레스 바의 너비에 애니메이션 효과 추가 */
    }

    @media(max-width: 672px) {
        max-width: 90%;
    }
`
);

export const CurrentFrequency = styled.p(
    () => `
    font-size: 36px;
    margin: 0;
    font-weight: bold;

    @media(max-width: 672px) {
        font-size: 30px; 
    }
`
);

export const WrapSelectBtnContainer = styled.div<{ enabled: boolean }>(
    ({ enabled }) => `
    display: grid;
    gap: 16px;

    & button {
        ${CommonButtonStyles}
        cursor: ${enabled ? "not-allowed" : "pointer"};
        transition: .2s all ease;
    }
`
);

export const GreenButton = styled.button<{ enabled: boolean }>(
    ({ enabled }) => `
    background-color: #B7F6B9;
    color: #007205;
    border: 1px solid #00D008;
    opacity: ${enabled ? 0.5 : 1};
    ${CommonButtonStyles}

    &:hover {
        background-color: #00D008;
        color: #FFFFFF;
    }
`
);

export const GrayButton = styled.button<{ enabled: boolean }>(
    ({ enabled }) => `
    background-color: #EDEDED;
    color: #535353;
    border: 1px solid #535353;
    opacity: ${enabled ? 0.5 : 1};
    ${CommonButtonStyles}

    &:hover {
        background-color: #535353;
        color: #FFFFFF;
    }
`
);

export const RedButton = styled.button<{ enabled: boolean }>(
    ({ enabled }) => `
    background-color: #FFC7C7;
    color: #800000;
    border: 1px solid #FF5C5C;
    opacity: ${enabled ? 0.5 : 1};
    ${CommonButtonStyles}

    &:hover {
        background-color: #FF5C5C;
        color: #FFFFFF;
    }
`
);

export const ResultBtn = styled.button(
    () => `
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
    }
`
);

export const ResultBtnContainer = styled.div(
    () => `
    margin: 20px auto;
    width: 100%;
    max-width: 50%;

    @media(max-width: 672px) {
        max-width: 80%;
    }
`
);

const PlayPauseBtn = styled.button(
    () => `
    width: 30%;
    padding: 12px;
    background-color: #949494;  
    color: #FFFFFF;
    cursor: pointer;
    border: none;
    border-radius: 12px;
    margin: 20px auto;
`
);

export const frequencies: string[] = [
    "(왼쪽) 125",
    "(오른쪽) 125",
    "(왼쪽) 250",
    "(오른쪽) 250",
    "(왼쪽) 500",
    "(오른쪽) 500",
    "(왼쪽) 1000",
    "(오른쪽) 1000",
    "(왼쪽) 2000",
    "(오른쪽) 2000",
    "(왼쪽) 4000",
    "(오른쪽) 4000",
    "(왼쪽) 8000",
    "(오른쪽) 8000",
];

export const buttonAns = [
    { label: "네, 잘들려요", score: 2, style: GreenButton },
    { label: "잘 모르겠어요.", score: 1, style: GrayButton },
    { label: "아니요, 잘 안들려요.", score: 0, style: RedButton },
];

export const TestPageComponents = ({ testerName }: { testerName: string }) => {
    const [enabled, setEnabled] = useState<boolean>(false);
    const [currentFrequencyIndex, setCurrentFrequencyIndex] = useState<number>(0);
    const [showResultsButton, setShowResultsButton] = useState<boolean>(false);
    const [resultMessage, setResultMessage] = useState<string>("");
    const [scores, setScores] = useState<number[]>([]);
    const [playPauseText, setPlayPauseText] = useState<string>("일시정지");
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleButtonClick = (score: number) => {
        // 다음 주파수로 이동
        if (currentFrequencyIndex < frequencies.length - 1) {
            setCurrentFrequencyIndex(currentFrequencyIndex + 1);
            setScores((prevScores) => [...prevScores, score]);
            setEnabled(false);
        } else {
            const finalScore = scores.reduce((acc, curr) => acc + curr, 0) + score;
            const updatedScores = [...scores, score];
            setScores(updatedScores);

            // 결과 버튼을 눌렀을 때의 동작 추가
            determineResult(finalScore);
            setShowResultsButton(true);
            setEnabled(true);
            setPlayPauseText("일시정지");
        }
    };

    const determineResult = (finalScore: number) => {
        if (finalScore >= 25) {
            setResultMessage("10대");
        } else if (finalScore > 20) {
            setResultMessage("20대");
        } else if (finalScore > 15) {
            setResultMessage("30대");
        } else if (finalScore > 10) {
            setResultMessage("40대");
        } else if (finalScore > 6) {
            setResultMessage("50대");
        } else if (finalScore > 2) {
            setResultMessage("60대");
        } else {
            setResultMessage("70대 이상");
        }
    };
    const handlePlayPause = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
            setPlayPauseText((prevText) =>
                prevText === "재생" ? "일시정지" : "재생"
            );
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            const prefix = currentFrequencyIndex % 2 === 0 ? "left" : "right";
            const frequency = frequencies[currentFrequencyIndex].replace(/\D/g, "");
            const audioFile = `/${prefix}_${frequency}Hz.mp3`;

            audioRef.current.src = audioFile;
            audioRef.current.load();

            if (!audioRef.current.paused && audioRef.current.currentTime > 0) {
                audioRef.current.currentTime = 0;
            }

            if (!enabled) {
                audioRef.current.play();
            }
        }
    }, [currentFrequencyIndex, enabled]);

    return (
        <StyledContent>
            <WrapTestContainer>
                <p>{currentFrequencyIndex + 1} / {frequencies.length}</p>
            <div className="progress-bar-container">
                    <div
                        className="progress-bar"
                        style={{
                            width: `${((currentFrequencyIndex + 1) / frequencies.length) * 100}%`,
                        }}
                    />
                </div>
                <h2>현재 주파수가 잘 들리나요?</h2>
                <CurrentFrequency>
                    {frequencies[currentFrequencyIndex]}Hz
                </CurrentFrequency>
                <audio ref={audioRef} autoPlay loop>
                    <source
                        src={`/left_${frequencies[currentFrequencyIndex].replace(
                            /\D/g,
                            ""
                        )}Hz.mp3`}
                        type="audio/mp3"
                    />
                    <source
                        src={`/right_${frequencies[currentFrequencyIndex].replace(
                            /\D/g,
                            ""
                        )}Hz.mp3`}
                        type="audio/mp3"
                    />
                </audio>
                <PlayPauseBtn onClick={handlePlayPause}>{playPauseText}</PlayPauseBtn>
                <WrapSelectBtnContainer enabled={enabled}>
                    {buttonAns.map((response, index) => (
                        <response.style
                            key={index}
                            onClick={() => {
                                handleButtonClick(response.score);
                            }}
                            enabled={enabled}
                            disabled={showResultsButton || enabled}
                        >
                            {response.label}
                        </response.style>
                    ))}
                </WrapSelectBtnContainer>
                <ResultBtnContainer>
                    {showResultsButton &&
                        currentFrequencyIndex === frequencies.length - 1 && (
                            <Link
                                href={{
                                    pathname: "/resultpage",
                                    query: {
                                        resultMessage: encodeURIComponent(resultMessage),
                                        name: testerName,
                                        scores,
                                    },
                                }}
                            >
                                <ResultBtn>
                                    결과 보기
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="16"
                                        viewBox="0 0 20 16"
                                        fill="none"
                                    >
                                        <path
                                            d="M1 8L19 8M19 8L12.25 15M19 8L12.25 1"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </ResultBtn>
                            </Link>
                        )}
                </ResultBtnContainer>
            </WrapTestContainer>
        </StyledContent>
    );
};
