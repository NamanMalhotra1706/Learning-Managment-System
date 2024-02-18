"use client"

import CourseDetailsPage from "../../components/Course/CourseDetailPage";

type Props = {}

const Page = ({params}:any) => {
  return (
    <div>
        <CourseDetailsPage id={params.id} />
    </div>
  )
}
 
export default Page;