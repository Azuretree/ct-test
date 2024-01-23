"use client"

import styled from "@emotion/styled";

const StyledContent = styled.main(() => `
        padding-top: 120px;
        margin: 0 auto;
        text-align: center;
        display: flex;
        max-width: 60%;
        width: 100%;
        min-height: 100%;
        height: 100%;
        flex-direction: column;
        box-sizing: border-box;
        justify-content: space-between;
        
        & .main-logo {
            margin: 0 auto;
        }
        
        @media(max-width: 1224px) {
            max-width: 90%; 
        }

`);

export default StyledContent;