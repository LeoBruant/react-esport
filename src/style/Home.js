import styled from 'styled-components'

export const Style = styled.div`
    .header {
        .title {
            text-align: center;
            padding: 2.5rem 0;
            font-size: 3.5rem;
            margin-bottom: 0;
        }
    }

    .spinner {
        display: block;
        margin: 0 auto;
    }

    .main {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 2.5rem;

        .matches-container {
            .title {
                text-align: center;
                padding: 2rem 0;
                border-bottom: 2px solid #ddd;
                margin: 0;

                &:first-letter {
                    text-transform: uppercase;
                }
            }

            .matches {
                padding: 2rem 0;
                padding-top: 0;
                display: flex;
                flex-direction: column;
                max-height: 750px;
                overflow-y: scroll;

                .match:last-child {
                    border-bottom: none !important;
                    padding-bottom: 0 !important;
                }
            }
        }
    }
`
