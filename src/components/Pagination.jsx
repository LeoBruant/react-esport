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
    }, [elementsNumber])

    return (
        <Pagination className="justify-content-center">
            {/* <Pagination.First onClick={() => (parseInt(page) !== 1 ? changePage(1) : '')} />
            <Pagination.Prev onClick={() => (parseInt(page) > 1 ? changePage(parseInt(page) - 1) : '')} /> */}
            {pages.map((array, index) => (
                <Pagination.Item
                    active={parseInt(page) === index + 1}
                    key={index + 1}
                    onClick={() => (parseInt(page) !== index + 1 ? changePage(index + 1) : '')}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            {/* <Pagination.Next onClick={() => (parseInt(page) < elementsNumber ? changePage(parseInt(page) + 1) : '')} />
            <Pagination.Last onClick={() => (parseInt(page) !== Math.ceil(elementsNumber) ? changePage(Math.ceil(elementsNumber)) : '')} /> */}
        </Pagination>
    )
}
