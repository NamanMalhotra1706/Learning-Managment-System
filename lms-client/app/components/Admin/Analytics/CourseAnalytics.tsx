import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/AnalyticsApi";
import { styles } from "@/app/styles/style";

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading, isError } = useGetCoursesAnalyticsQuery({});

  const analyticsData: any = [
    // { name: "July 2023", uv: 2 },
    // { name: "Aug 2023", uv: 5 },
    // { name: "Sept 2023", uv: 7 },
    // { name: "Oct 2023", uv: 2 },
    // { name: "Nov 2023", uv: 5 },
    // { name: "Dec 2023", uv: 7 },
  ];

    data && data.courses.last12Months.forEach((item:any)=>{
      analyticsData.push({name:item.month,uv:item.count});
    });

  const minValue = 0;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`${styles.title} ml-[130px] !text-start`}>
              Course Analytics
            </h1>
            <p className={`${styles.label} ml-[135px]`}>
              Last 12 months analytics data{" "}
            </p>
          </div>
          <ResponsiveContainer
            width="90%"
            height="50%"
            className="w-full h-90 items-center justify-center"
          >
            <BarChart width={150} height={300} data={analyticsData}>
              <XAxis dataKey="name">
                <Label offset={0} position="insideBottom" />
              </XAxis>
              <YAxis domain={[minValue, "auto"]} />
              <Bar dataKey="uv" fill="#3faf82">
                <LabelList dataKey="uv" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
