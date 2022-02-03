import styled from 'styled-components'

export const Style = styled.div`
    .spinner {
        display: block;
        margin: 0 auto;
    }

    .main {
        .elements {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .element:hover {
                cursor: pointer;
                border-color: #ddd !important;
            }
        }
    }
`
