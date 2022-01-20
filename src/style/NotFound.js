import styled from 'styled-components'

export const Style = styled.main`
    @import url('https://fonts.googleapis.com/css?family=Fira+Mono:400');

    display: flex;
    flex-direction: column;
    height: 100vh;

    .body {
        display: flex;
        width: 100vw;
        align-items: center;
        justify-content: center;
        margin: 0;
        background: #131313;
        color: #fff;
        font-size: 250px;
        font-family: 'Fira Mono', monospace;
        letter-spacing: -7px;
        flex-grow: 1;
    }

    .body .text {
        animation: glitch 1s linear infinite;
    }

    @keyframes glitch {
        2%,
        64% {
            transform: translate(2px, 0) skew(0deg);
        }
        4%,
        60% {
            transform: translate(-2px, 0) skew(0deg);
        }
        62% {
            transform: translate(0, 0) skew(5deg);
        }
    }

    .body .text:before,
    .body .text:after {
        content: attr(title);
        position: absolute;
        left: 0;
    }

    .body .text:before {
        animation: glitchTop 1s linear infinite;
        clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
        -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
    }

    @keyframes glitchTop {
        2%,
        64% {
            transform: translate(2px, -2px);
        }
        4%,
        60% {
            transform: translate(-2px, 2px);
        }
        62% {
            transform: translate(13px, -1px) skew(-13deg);
        }
    }

    .body .text:after {
        animation: glitchBotom 1.5s linear infinite;
        clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
        -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
    }

    @keyframes glitchBotom {
        2%,
        64% {
            transform: translate(-2px, 0);
        }
        4%,
        60% {
            transform: translate(-2px, 0);
        }
        62% {
            transform: translate(-22px, 5px) skew(21deg);
        }
    }
`