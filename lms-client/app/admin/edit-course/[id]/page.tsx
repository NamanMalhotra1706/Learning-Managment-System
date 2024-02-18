import React from 'react'
import EditCourse from '@/app/components/Admin/Course/EditCourse';
import AdminSidebar from '../../../components/Admin/sidebar/AdminSidebar';
import Heading from '../../../../app/utils/Heading';
import DashboardHeader from '../../../../app/components/Admin/DashboardHeader';

type Props = {}

const Page = ({params}:any) => {
    const id = params?.id;
   
  return (
    <div>
        <Heading 
        title="Elearning-Admin"
        description="Elearning is a platform for students to learn and get help from teachers"
        keywords='Programming,MERN,Redux,Machine Learning' />
        <div className='flex'>
            <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar />
            </div>
            <div className="w-[85%]">
                <DashboardHeader />
                <EditCourse id={id}/>
            </div>
        </div>
    </div>
  )
}

export default Page