import React, { useEffect, useState } from 'react'
import { BsFillPencilFill } from "react-icons/bs";
import { BiHomeSmile } from "react-icons/bi";
import { Divider, Spin, Modal, Radio, Space, Select } from 'antd'
import { firestore } from "../../config/firebase";
import { collection,  doc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import {  LoadingOutlined } from '@ant-design/icons'
import { Fade } from 'react-awesome-reveal';



const Attendance = () => {

  useEffect(
    () => {
      getData()
    }, []
  )


  const [documents, setDocuments] = useState([])
  const [isAdding, setIsAdding] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false)
  let initialState = {
    studentId: "", name: "", contactInfo: ""
  }
  const [state, setState] = useState(initialState)


  // GET DATA
  const getData = async () => {
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

  const [isProcessing , setIsProcessing] = useState(false);
  const [attendance , setAttendance] = useState()

  const handleAttendance = async (document , e) => {
    setState(document)
    state.attendance = attendance
    try {
      setIsProcessing(true)
      await updateDoc(doc(firestore, "students", document.studentId) , state)
      setIsProcessing(false)
    } catch (err) {
      console.log('err', err)
      setIsProcessing(false)
    }

  }

  return (
    <Fade>
      <div className='container'>
      <div className="row">
        <div className="col-12">
          <h3 className='mt-3'>
            Manage Attendance <BsFillPencilFill />
          </h3>
          <Divider />
          {
            isDataLoading
              ? <div className="text-center mt-5"><Spin className='text-dark mt-5' indicator={<LoadingOutlined style={{ fontSize: 50, color: "rgb(50, 187, 255)" }} spin />} /></div>
              : <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Student Name</th>
                      <th>Student ID</th>
                      <th>Phone Number</th>
                      <th>Attendance</th>
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
                              <td>
                                <Select
                                  onChange={(e) => { setAttendance(e); handleAttendance(document) }}
                                  defaultValue={document.attendance ? document.attendance : "-"} loading={isProcessing} 
                                  options={[
                                    { value: 'Present', label: 'P' },
                                    { value: '-', label: '-' },
                                    { value: 'Absent', label: 'A' },
                                  ]}
                                  disabled={isProcessing}
                                />
                              </td>
                            </tr>
                          )
                        })

                    }
                  </tbody>
                </table>
                
              </div>
          }
        </div>

      </div>
    </div>
    </Fade>
  )
}

export default Attendance