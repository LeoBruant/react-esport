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
        .leagues {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .league {
                padding: 2rem;
                display: flex;
                flex-direction: column;
                height: 250px;
                margin: 1rem auto;
                width: 250px;

                .name {
                    text-align: center;
                    font-size: 1.25rem;
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
