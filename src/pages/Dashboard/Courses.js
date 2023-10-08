import { SiBookstack } from "react-icons/si"; 
import { GiBookshelf } from "react-icons/gi"; 
import React, { useEffect, useState } from 'react'
import { AiFillFileText } from "react-icons/ai"; 
import { BiAlignMiddle } from "react-icons/bi"; 
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { BiHomeSmile } from "react-icons/bi";
import Form from 'antd/es/form'
import { Button, Divider, Popconfirm, Spin, Modal } from 'antd'
import { message } from 'antd'
import { firestore } from "../../config/firebase";
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import { Fade } from "react-awesome-reveal";



const Courses = () => {

  useEffect(
    () => {
      getData()
    }, []
  )


  const [documents, setDocuments] = useState([])
  const [isAdding, setIsAdding] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false)
  let initialState = {
    courseId: "", name: "", description: ""
  }
  const [state, setState] = useState(initialState)

  const handleChange = e => {
    const { name } = e.target
    setState({
      ...state, [name]: e.target.value
    })
  }
  // Handle Submit

  const handleSubmit = async () => {
    const { name, description, courseId } = state;
    if (name.length < 3)
      return message.error("Enter Name correctly")
    if (courseId.length < 3)
      return message.error("Enter Course ID correctly")
    if (description.length < 11)
      return message.error("Description Length is less than 10")
    setIsAdding(true)
    state.dateAdded = serverTimestamp()
    state.id = Math.random().toString(36).slice(2)
    try {
      await setDoc(doc(firestore, "courses", courseId), state, { merge: true })
      setIsAdding(false)
      message.success("Course has been added")

    } catch (err) {
      console.log('err', err)
      message.error("Something went wrong")
      setIsAdding(false)
    }
    getData()
  }

  // ADD MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showEditModal = () => {
    setIsEditModalOpen(true);
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  // GET DATA
  const getData = async () => {
    setIsDataLoading(true)
    const querySnapshot = await getDocs(collection(firestore, "courses"));
    const array = []
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      array.push(doc.data())
    });
    setDocuments(array)
    setIsDataLoading(false)
  }
  // Handle Delete
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = async (document) => {
    setIsDeleting(true)
    await deleteDoc(doc(firestore, "courses", document.courseId));
    setIsDeleting(false)
    getData()
  }

  // Handle Edit

  const [isEditing, setIsEditing] = useState(false)
  const handleUpdate = async () => {
    const { name, description, courseId } = state;
    if (name.length < 3)
      return message.error("Enter Course Name correctly")
    if (courseId.length < 3)
      return message.error("Enter Course ID correctly")
    if (description.length < 11)
      return message.error("Description length is less than 11")
    setIsEditing(true)
    state.dateUpdated = serverTimestamp()
    try {
      await setDoc(doc(firestore, "courses", courseId), state, { merge: true })
      message.success("Course has been updated")
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
            Manage Courses <SiBookstack />
          </h3>

          <Form onFinish={handleSubmit} layout="vertical" className="mx-auto mt-5" style={{ maxWidth: "800px" }}>
            <Form.Item>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" style={{ backgroundColor: "#fff" }}>
                  <GiBookshelf />
                </span>
                <input type='text' name='name' style={{ borderLeft: "0px" }} onChange={handleChange} className="w-100 form-control form-control-sm" placeholder='Course Name' />
              </div>
            </Form.Item>
            <Form.Item>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" style={{ backgroundColor: "#fff" }}>
                  <BiAlignMiddle />
                </span>
                <input type='text' name='courseId' style={{ borderLeft: "0px" }} onChange={handleChange} className="w-100 form-control form-control-sm" placeholder='Course ID' />
              </div>
            </Form.Item>
            <Form.Item>
              <div className="input-group flex-nowrap">
                <span className="input-group-text" style={{ backgroundColor: "#fff" }}>
                  <AiFillFileText />
                </span>
                <input type='text' name='description' style={{ borderLeft: "0px" }} onChange={handleChange} className="w-100 form-control form-control-sm" placeholder='Description' />
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" loading={isAdding} htmlType="submit" block>Add a Course</Button>
            </Form.Item>

          </Form>
        </div>
        <div className="col-12">
          <Divider />
          {
            isDataLoading
              ? <div className="text-center mt-5"><Spin className='text-dark mt-5' indicator={<LoadingOutlined style={{ fontSize: 50, color: "rgb(50, 187, 255)" }} spin />} /></div>
              : <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Course Name</th>
                      <th>Course ID</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {
                      documents.length < 1
                        ? <tr><td colSpan={5}><div><h4 className="text-center my-2">No Courses Right Now <BiHomeSmile className="mb-1" /></h4></div></td></tr>
                        : documents.map((document, i) => {
                          return (
                            <tr key={i + 1}>
                              <td>{i + 1}</td>
                              <td>{document.name}</td>
                              <td>{document.courseId}</td>
                              <td>{document.description}</td>
                              <td>
                                <Button onClick={(() => { setState(document); showEditModal(); })} className="me-1" type="primary" icon={<AiFillEdit className="mb-1" />} />
                                <Popconfirm
                                  okType='danger'
                                  title="Delete Task"
                                  description="Are you sure to Delete this Task?"
                                  onConfirm={() => handleDelete(document)}
                                  okText="Delete"
                                  cancelText="No"
                                >
                                  <Button type="primary" danger icon={<AiFillDelete className="mb-1" />} />
                                </Popconfirm>
                              </td>
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
                          <GiBookshelf />
                          </span>
                          <input type='text' name='name' style={{ borderLeft: "0px" }} value={state.name} onChange={handleChange} className="w-100 form-control form-control-sm" placeholder='Course Name' />
                        </div>
                      </Form.Item>
                      <Form.Item>
                        <div className="input-group flex-nowrap">
                          <span className="input-group-text" style={{ backgroundColor: "#fff" }}>
                            <BiAlignMiddle />
                          </span>
                          <input type='text' name='courseId' value={state.courseId} style={{ borderLeft: "0px" }} onChange={handleChange} className="w-100 form-control form-control-sm" placeholder='Course ID' />
                        </div>
                      </Form.Item>
                      <Form.Item>
                        <div className="input-group flex-nowrap">
                          <span className="input-group-text" style={{ backgroundColor: "#fff" }}>
                            <AiFillFileText />
                          </span>
                          <input type='text' name='description' value={state.description} style={{ borderLeft: "0px" }} onChange={handleChange} className="w-100 form-control form-control-sm" placeholder='Description' />
                        </div>
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" loading={isEditing} htmlType="submit" block>Update Course</Button>
                      </Form.Item>

                    </Form>
                  </main>
                </Modal>
              </div>
          }
        </div>

      </div>



    </div>
    </Fade>
  )
}

export default Courses