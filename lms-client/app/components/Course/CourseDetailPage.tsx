import Heading from "@/app/utils/Heading";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Header from "../Header";
import Footer from "../Footer/Footer";
import CourseDetails from "./CourseDetails";

type Props = {
  id: string;
};

const CourseDetailPage = ({ id }: Props) => {
  console.log(id);
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  console.log(data);
  
  return (
    <div>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <Heading
              title={data.course.name + " - Elearning"}
              description={
                "It is a platform for students to learn and get help from teachersIt is a platform for students to learn and get help from teachers"
              }
              keywords={data?.course?.tags}
            />
            <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
            />

            <CourseDetails data={data.course} />

            <Footer />
            </div>
        )}
      </>
    </div>
  );
};

export default CourseDetailPage;
