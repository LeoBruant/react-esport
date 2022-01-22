import styled from 'styled-components'

export const Style = styled.div`
    .header {
        .title {
            text-align: center;
            padding: 5rem 0;
            font-size: 4.5rem;
            border-bottom: 2px solid #000;
            margin-bottom: 0;
        }
    }
    .main {
        .leagues {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            border-left: 2px solid #000;
            border-right: 2px solid #000;

            .league {
                padding: 2rem;
                display: flex;
                flex-direction: column;
                height: 250px;
                margin-left: auto;
                margin-right: auto;

                .name {
                    text-align: center;
                    font-size: 1.5rem;
                }

                .image-container {
                    display: flex;
                    height: 100%;
                    align-items: center;
                    justify-content: center;

                    .image {
                        max-height: 150px;
                        max-width: 100%;
                    }
                }
            }
        }
    }
`
