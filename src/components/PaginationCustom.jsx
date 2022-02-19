import { Pagination } from 'react-bootstrap'
import React from 'react'

export default class PaginationCustom extends React.Component {
    render() {
        return (
            <Pagination className="justify-content-center">
                <Pagination.First
                    disabled={parseInt(this.props.page) === 1}
                    onClick={() => (parseInt(this.props.page) !== 1 ? this.props.changePage(1) : '')}
                />
                <Pagination.Prev
                    disabled={parseInt(this.props.page) === 1}
                    onClick={() => (this.props.page > 1 ? this.props.changePage(parseInt(this.props.page) - 1) : '')}
                />

                {this.props.page > 1 && <Pagination.Ellipsis />}

                {this.props.page > 1 && (
                    <Pagination.Item active={false} onClick={() => this.props.changePage(parseInt(this.props.page) - 1)}>
                        {this.props.page - 1}
                    </Pagination.Item>
                )}

                <Pagination.Item active={true}>{this.props.page}</Pagination.Item>

                {this.props.page < this.props.elementsNumber && (
                    <Pagination.Item
                        active={false}
                        onClick={() =>
                            this.props.page < this.props.elementsNumber ? this.props.changePage(parseInt(this.props.page) + 1) : ''
                        }
                    >
                        {parseInt(this.props.page) + 1}
                    </Pagination.Item>
                )}

                {parseInt(this.props.page) < this.props.elementsNumber && <Pagination.Ellipsis />}

                <Pagination.Next
                    disabled={parseInt(this.props.page) === this.props.elementsNumber}
                    onClick={() =>
                        parseInt(this.props.page) < this.props.elementsNumber ? this.props.changePage(parseInt(this.props.page) + 1) : ''
                    }
                />
                <Pagination.Last
                    disabled={parseInt(this.props.page) >= this.props.elementsNumber}
                    onClick={() =>
                        parseInt(this.props.page) !== this.props.elementsNumber ? this.props.changePage(this.props.elementsNumber) : ''
                    }
                />
            </Pagination>
        )
    }
}
