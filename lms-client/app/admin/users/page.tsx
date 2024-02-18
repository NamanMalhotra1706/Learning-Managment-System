"use client";

import DashBoardHero from '@/app/components/Admin/DashBoardHero';
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import React from 'react';
import AllUsers from '@/app/components/Admin/Users/AllUsers';

type Props = {}

const page = (props: Props) => {
  return (
    <div> 
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="Elearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashBoardHero />
            <AllUsers isTeam={false} />
          </div>
        </div>
      </AdminProtected>
      
    </div>
  )
}

export default page;