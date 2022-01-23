import styled from 'styled-components'

export const Style = styled.div`
    .header {
        .title {
            text-align: center;
            padding: 2.5rem 0 5rem 0;
            font-size: 4.5rem;
            border-bottom: 2px solid #000;
            margin-bottom: 0;
        }
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
                padding: 0 2.5rem;
                display: flex;
                flex-direction: column;

                .match {
                    border-bottom: 2px solid #000;
                    padding: 1rem 0;

                    .times {
                        text-align: center;
                        padding-bottom: 1rem;

                        .text {
                            margin: 0;
                            text-transform: capitalize;
                        }
                    }

                    .opponents {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .opponent {
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            .name {
                                text-align: center;
                            }

                            .image {
                                max-width: 100px;
                                height: 100px;
                                margin-top: 1rem;
                            }
                        }

                        .versus {
                            font-size: 2.25rem;
                        }
                    }
                }
            }
        }
    }
`
