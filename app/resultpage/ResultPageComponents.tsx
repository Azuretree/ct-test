"use client";

import Link from "next/link";
import StyledContent from "../style";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { buttonAns, frequencies } from "../testpage/TestPageComponents";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { AccordionItem } from "@/Components/AccordionItem";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const ResetBtn = styled.button(
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
        margin-right: 8px;

        & path {
            fill: #FFFFFF;
        }
    }
`
);

const ResultAge = styled.p(
  () => `
    color: #0075FF;
    font-size: 42px;
    font-weight: bold;
    margin: 14px 0;
`
);

const TotalScore = styled.p(
  () => `
    font-size: 24px;
    font-weight: bold;
    margin: 14px 0;
    color: #929292;
`
);

const StyledCopyURL = styled.button<{ copied: boolean }>(
  () => `
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
`
);

const CopyUrlContainer = styled.div(
  () => `
    display: flex;
    background-color: #F0F0F0;
    border-radius: 12px;
    padding: 8px;
    gap: 8px;

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
`
);

interface ResultPageComponentsProps {
  name: string;
  resultMessage: string;
  scores: number[];
}

export const ResultPageComponents = <T extends ResultPageComponentsProps>({
  name,
  resultMessage,
  scores,
}: T) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<string>("");

  // 주파수 배열을 "왼쪽"과 "오른쪽"의 쌍으로 묶은 배열 생성
  const pairedFrequencies: string[][] = [];
  for (let i = 0; i < frequencies.length; i += 2) {
    pairedFrequencies.push([frequencies[i], frequencies[i + 1]]);
  }

  // 라벨 배열 생성
  const labels: string[] = pairedFrequencies.map(pair => pair[0].substring(5)); // "왼쪽" 라벨만 사용

  // 데이터 배열 생성
  const leftScores: number[] = scores.filter((_, index) => index % 2 === 0);
  const rightScores: number[] = scores.filter((_, index) => index % 2 !== 0);

  const data = {
    labels,
    datasets: [
      {
        label: '왼쪽',
        data: leftScores,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '오른쪽',
        data: rightScores,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
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
              return "";
            }
          },
        },
      },
    },
  };

  const calculateTotalScore: number = scores
    .map((e) => Number(e))
    .reduce((acc, curr) => acc + curr, 0);
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
      <img src="/result.png" width={200} />
      <h1>
        {nameResult}님의
        <br /> 청력 테스트 결과는?
      </h1>
      <ResultAge>{decodeURIComponent(resultMessage)}대</ResultAge>
      <TotalScore>총점: {calculateTotalScore}점</TotalScore>
      <p>주파수를 통해 여러분의 귀를 나이별로 분석해봅니다.</p>
      <Bar data={data} options={options} />
      <h2>🧷 결과 링크 공유하기</h2>
      <CopyUrlContainer>
        <div className="current-url">
          <p>{currentUrl}</p>
        </div>
        <StyledCopyURL onClick={copyUrlToClipboard} copied={copied}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
            <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
          </svg>
          <span>Copy</span>
        </StyledCopyURL>
      </CopyUrlContainer>
      <AccordionItem />
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <ResetBtn>다시하기</ResetBtn>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title size="5">주의</AlertDialog.Title>
          <AlertDialog.Description size="3">
            테스트를 다시 시작할까요? 현재 기록은 모두 날아갈 수 있습니다.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                취소
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Link href="/">
                <Button variant="solid" color="blue">
                  다시하기
                </Button>
              </Link>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </StyledContent>
  );
};
