import React from 'react'
// REACT_ROUTER_DOM
import { NavLink } from 'react-router-dom'
// REACT ICONS
import { ImBooks } from "react-icons/im";
import { BsPencilSquare } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
// ANTD
import { Divider, Layout, Typography } from 'antd';
// Images
import bookLogo from '../../assets/Images/logo192.png'

const Sidebar = () => {

    const { Sider } = Layout;

    return (
        <Sider theme='light' id='sideBar' breakpoint='sm' collapsedWidth="0" zeroWidthTriggerStyle={{ zIndex: "1", position: "absolute", top: "10px", boxShadow: "0 0 20px rgba(0 , 0 , 0 , 0.3)" }}>

            <div className="container mx-auto rounded-3 d-flex flex-column min-vh-100">
                <div className='flex-grow-1'>
                    <div className="row mt-3">
                        <div className="col-12 mb-4 d-flex justify-content-start align-items-center">
                            <span className='h4 me-2'>City High School</span>
                        </div>
                        <Divider />
                        <div className="col-12 mb-4" >
                            <Typography.Title level={5} style={{ color: 'rgb(103, 187, 255)' }}>Dashboard  <RiDashboardFill className="mb-1" /> </Typography.Title>
                        </div>
                        <div className="col-12">
                            <h6>Admin Menu</h6>
                            <div id='navigationMenu' className='mt-3'>
                                <div className="row " style={{ rowGap: "5px" }}>
                                    
                                    <div className="col-12">
                                        <NavLink className="btn btn-sm btn-light text-start w-100 sideButtons" to="/" ><AiFillHome className="mb-1" />  &ensp;Home</NavLink>
                                    </div>
                                    <div className="col-12">
                                        <NavLink className="btn btn-sm btn-light text-start w-100 sideButtons" to="/students" ><FaUsers className="mb-1" />  &ensp;Students</NavLink>
                                    </div>
                                    <div className="col-12">
                                        <NavLink className="btn btn-sm btn-light text-start w-100 sideButtons" to="/courses"><ImBooks className="mb-1" /> &ensp;Courses</NavLink>
                                    </div>
                                    <div className="col-12">
                                        <NavLink className="btn btn-sm btn-light text-start w-100 sideButtons" to="/attendance"><BsPencilSquare className="mb-1" /> &ensp;Attendance</NavLink>
                                    </div>
                                </div>
                            </div>

                            <Divider />
                        </div>
                    </div>
                </div>
            </div>

        </Sider>

    )
}

export default Sidebar