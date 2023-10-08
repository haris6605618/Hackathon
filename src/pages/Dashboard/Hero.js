import { AiFillDashboard, AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { BiHomeSmile } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { AiFillPhone } from "react-icons/ai";
import React, { useEffect, useState } from 'react'
import { AiFillIdcard } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import Form from 'antd/es/form'
import { Button, Divider, Popconfirm, Spin, Modal } from 'antd'
import { message } from 'antd'
import { firestore } from "../../config/firebase";
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { Fade } from "react-awesome-reveal";



const Hero = () => {

  useEffect(
    () => {
      getStudentData()
      getCourseData()
    }, []
  )


  const [documents, setDocuments] = useState([])
  const [courseDocuments, setCourseDocuments] = useState([])
  const [isAdding, setIsAdding] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [isCourseLoading, setIsCourseLoading] = useState(false)
  let initialState = {
    studentId: "", name: "", contactInfo: ""
  }
  const [state, setState] = useState(initialState)

  const handleChange = e => {
    const { name } = e.target
    setState({
      ...state, [name]: e.target.value
    })
  }


  // ADD MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  // GET Student DATA
  const getStudentData = async () => {
    setIsDataLoading(true)
    const querySnapshot = await getDocs(collection(firestore, "students"));
    const array = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      array.push(doc.data())
    });
    setDocuments(array)
    setIsDataLoading(false)
  }
  // GET Course DATA
  const getCourseData = async () => {
    setIsCourseLoading(true)
    const querySnapshot = await getDocs(collection(firestore, "courses"));
    const array = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      array.push(doc.data())
    });
    setCourseDocuments(array)
    setIsCourseLoading(false)
  }
  // Handle Delete
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = async (document) => {
    setIsDeleting(true)
    await deleteDoc(doc(firestore, "students", document.studentId));
    setIsDeleting(false)
    getStudentData()
  }

  // Handle Edit

  const [isEditing, setIsEditing] = useState(false)
  const handleUpdate = async () => {
    const { name, contactInfo, studentId } = state;
    if (name.length < 3)
      return message.error("Enter Name correctly")
    if (studentId.length < 3)
      return message.error("Enter Student ID correctly")
    if (contactInfo.length < 11)
      return message.error("Phone number length is less than 11")
    setIsEditing(true)
    state.dateUpdated = serverTimestamp()
    try {
      await setDoc(doc(firestore, "students", studentId), state, { merge: true })
      message.success("Student has been updated")
      setIsEditing(false)
      setIsModalOpen(false)
      setIsEditModalOpen(false)

    } catch (err) {
      console.log('err', err)
      message.error("Something went wrong")
      setIsModalOpen(false)
      setIsEditModalOpen(false)
      setIsEditing(false)
    }
  }


  return (
    <Fade>
      <div className='container'>
        <div className="row">
          <div className="col-12">
            <h3 className='mt-3'>
              Admin Dashboard <AiFillDashboard className="mb-1" />
            </h3>
            {
              isDataLoading
                ? <div className="text-center mt-5"><Spin className='text-dark mt-5' indicator={<LoadingOutlined style={{ fontSize: 50, color: "rgb(50, 187, 255)" }} spin />} /></div>
                : <div>
                  <h4 className="mt-5 my-3">Students:</h4>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Student Name</th>
                          <th>Student ID</th>
                          <th>Phone Number</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        {
                          documents.length < 1
                            ? <tr><td colSpan={5}><div><h4 className="text-center my-2">No Students Right Now <BiHomeSmile className="mb-1" /></h4></div></td></tr>
                            : documents.map((document, i) => {
                              return (
                                <tr key={i + 1}>
                                  <td>{i + 1}</td>
                                  <td>{document.name}</td>
                                  <td>{document.studentId}</td>
                                  <td>{document.contactInfo}</td>
                                </tr>
                              )
                            })

                        }
                      </tbody>
                    </table>

                  </div>
                  <h4 className="mt-5 my-3">Courses:</h4>
                  {isCourseLoading
                    ? <div className="text-center mt-5"><Spin className='text-dark mt-5' indicator={<LoadingOutlined style={{ fontSize: 50, color: "rgb(50, 187, 255)" }} spin />} /></div>
                    : <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Course Name</th>
                            <th>Course ID</th>
                            <th>Description</th>
                          </tr>
                        </thead>
                        <tbody className="table-group-divider">
                          {
                            courseDocuments.length < 1
                              ? <tr><td colSpan={5}><div><h4 className="text-center my-2">No Courses Right Now <BiHomeSmile className="mb-1" /></h4></div></td></tr>
                              : courseDocuments.map((document, i) => {
                                return (
                                  <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{document.name}</td>
                                    <td>{document.courseId}</td>
                                    <td>{document.description}</td>
                                  </tr>
                                )
                              })

                          }
                        </tbody>
                      </table>
                      {/* Edit Modal */}

                      <Modal okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} open={isEditModalOpen} onCancel={() => { handleEditCancel() }}>
                        <header>
                          <h3 className='text-center'>Edit Data</h3>
                        </header>
                        <Divider />
                        <main>
                          <Form onFinish={handleUpdate} layout="vertical" className="mx-auto mt-5" style={{ maxWidth: "800px" }}>
                            <Form.Item>
                              <div className="input-group flex-nowrap">
                                <span className="input-group-text" style={{ backgroundColor: "#fff" }}>
                                  <FaUserAlt />
                                </span>
                                <input type='text' name='name' style={{ borderLeft: "0px" }} value={state.name} onChange={handleChange} className="w-100 form-control form-control-sm" placeholder='Student Name' />
                              </div>
                            </Form.Item>
                            <Form.Item>
                              <div className="input-group flex-nowrap">
                                <span className="input-group-text" style={{ backgroundColor: "#fff" }}>
                                  <AiFillIdcard />
                                </span>
                                <input type='text' name='studentId' value={state.studentId} style={{ borderLeft: "0px" }} onChange={handleChange} className="w-100 form-control form-control-sm" placeholder='Student ID' />
                              </div>
                            </Form.Item>
                            <Form.Item>
                              <div className="input-group flex-nowrap">
                                <span className="input-group-text" style={{ backgroundColor: "#fff" }}>
                                  <AiFillPhone />
                                </span>
                                <input type='tel' name='contactInfo' value={state.contactInfo} style={{ borderLeft: "0px" }} onChange={handleChange} className="w-100 form-control form-control-sm" placeholder='Phone Number' />
                              </div>
                            </Form.Item>
                            <Form.Item>
                              <Button type="primary" loading={isEditing} htmlType="submit" block>Update Data</Button>
                            </Form.Item>

                          </Form>
                        </main>
                      </Modal>
                    </div>
                  }
                </div>
            }
          </div>

        </div>



      </div>
    </Fade>
  )
}

export default Hero