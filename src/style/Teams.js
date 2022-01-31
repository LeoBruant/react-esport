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
        .teams {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .team:hover {
                cursor: pointer;
                border-color: #ddd !important;
            }
        }
    }
`
