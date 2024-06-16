import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser,setAllUsers] = useState([])
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const[updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name: "",
        role : "",
        _id : "",
    })
    const fetchAllUsers = async() => {
        const fetchData = await fetch(SummaryApi.allUser.url,{
            method : SummaryApi.allUser.method,
            credentials : 'include'
        })
        const dataResponse = await fetchData.json()
        if(dataResponse.success)
            {
                setAllUsers(dataResponse.data)
            }
            if(dataResponse.error)
                {
                    toast.error(dataResponse.message)
                }
        console.log(dataResponse)

    }
    useEffect(()=>{
        fetchAllUsers()

    },[])
  return (
    <div className='bg-white pb-4'>
        <table className='w-full userTable'>
            <thead>
                <tr className='bg-black text-white'>
                <th>Sl.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Action</th>

                </tr>
              
            </thead>
            <tbody>
                {
                    allUser.map((e1,index) => {
                        return(
                            <tr>
                                <td>{index+1} </td>
                                <td>{e1?.name}</td>
                                <td>{e1?.email}</td>
                                <td>{e1?.role}</td>
                                <td>{moment(e1?.createdAt).format('LL')}</td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full cursor-pointerhover:bg-green-500 hover:text-white'
                                     onClick={()=>{
                                        setUpdateUserDetails(e1)
                                        setOpenUpdateRole(true)}}>
                                        <MdModeEdit/></button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        {
            openUpdateRole && (
                <ChangeUserRole 
                onClose={()=>setOpenUpdateRole(false)}
                name={updateUserDetails.name}
                email={updateUserDetails.email}
                role={updateUserDetails.role}
                userId={updateUserDetails._id}
                callFunc={fetchAllUsers}/>
            )
        }
       
    </div>
  )
}

export default AllUsers