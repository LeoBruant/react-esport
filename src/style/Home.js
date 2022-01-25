import styled from 'styled-components'

export const Style = styled.div`
    .header {
        .title {
            text-align: center;
            padding: 2.5rem 0 5rem 0;
            font-size: 4.5rem;
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

        .matches-container {
            .title {
                text-align: center;
                padding: 2rem 0;
                border-bottom: 2px solid #000;
                margin: 0;

                &:first-letter {
                    text-transform: uppercase;
                }
            }

            .matches {
                padding: 2.5rem;
                display: flex;
                flex-direction: column;
            }
        }
    }
`
