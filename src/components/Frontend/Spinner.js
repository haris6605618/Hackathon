import React from 'react'
import { Spin } from 'antd'
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons'
const Spinner = () => {
    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div>
                <h1 className='d-block fw-bolder'>Todo App <CheckCircleOutlined /></h1>
                <div className="text-center">
                    <Spin className='text-dark' indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
                </div>
            </div>
        </div>
    )
}

export default Spinner