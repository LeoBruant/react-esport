import { Pagination } from 'react-bootstrap'
import React, { useState } from 'react'

export default function PaginationCustom({ changePage, elementsNumber, page }) {
    const [pages, setPages] = useState([])

    React.useEffect(() => {
        let pageArrays = []

        for (let i = 0; i < elementsNumber; i++) {
            pageArrays.push([])
        }

        setPages(pageArrays)
    }, [])

    return (
        <Pagination>
            {pages.map((array, index) => (
                <Pagination.Item active={parseInt(page) === index + 1} key={index + 1} onClick={() => changePage(index + 1)}>
                    {index + 1}
                </Pagination.Item>
            ))}
        </Pagination>
    )
}
