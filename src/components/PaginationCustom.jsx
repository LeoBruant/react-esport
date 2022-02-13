import { Pagination } from 'react-bootstrap'

export default function PaginationCustom({ changePage, elementsNumber, page }) {
    return (
        <Pagination className="justify-content-center">
            <Pagination.First disabled={parseInt(page) === 1} onClick={() => (parseInt(page) !== 1 ? changePage(1) : '')} />
            <Pagination.Prev disabled={parseInt(page) === 1} onClick={() => (page > 1 ? changePage(parseInt(page) - 1) : '')} />

            {page > 1 && <Pagination.Ellipsis />}

            {page > 1 && (
                <Pagination.Item active={false} onClick={() => changePage(parseInt(page) - 1)}>
                    {page - 1}
                </Pagination.Item>
            )}

            <Pagination.Item active={true}>{page}</Pagination.Item>

            {page < elementsNumber && (
                <Pagination.Item active={false} onClick={() => (page < elementsNumber ? changePage(parseInt(page) + 1) : '')}>
                    {parseInt(page) + 1}
                </Pagination.Item>
            )}

            {parseInt(page) < elementsNumber && <Pagination.Ellipsis />}

            <Pagination.Next
                disabled={parseInt(page) === elementsNumber}
                onClick={() => (parseInt(page) < elementsNumber ? changePage(parseInt(page) + 1) : '')}
            />
            <Pagination.Last
                disabled={parseInt(page) >= elementsNumber}
                onClick={() => (parseInt(page) !== elementsNumber ? changePage(elementsNumber) : '')}
            />
        </Pagination>
    )
}
