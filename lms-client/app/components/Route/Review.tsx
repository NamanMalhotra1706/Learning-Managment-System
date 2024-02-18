import React from "react";
import Image from "next/image";
import { styles } from "@/app/styles/style";
import ReviewCard from "../Review/Review";
type Props = {};

export const reviews = [
  {
    name: "Naman Malhotra",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Chitkara University",
    comment:
      "I just wanted to take a moment to express my gratitude for the incredible web development course I've had the privilege to take. This course has truly been a game-changer for me. The depth of knowledge, clarity of instruction, and practical hands-on exercises have exceeded my expectations.",
  },
  {
    name: "Manvi Grover",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    profession: "Student | Chitkara University",
    comment:
      "The instructors have a remarkable ability to break down complex concepts into understandable chunks, making the learning process smooth and enjoyable. Their passion for web development is palpable, and it's contagious! I've found myself deeply engaged in every lesson, eager to apply what I've learned.",
  },
  {
    name: "Naman Malhotra",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "Student | Chitkara University",
    comment:
      "What sets this course apart is its focus on real-world applications. Not only have I gained a solid understanding of the fundamentals, but I've also had the opportunity to work on practical projects that mirror industry scenarios. This hands-on approach has boosted my confidence and prepared me for tackling real-world challenges.",
  },
  {
    name: "Manvi Grover",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    profession: "Student | Chitkara University",
    comment:
      "Furthermore, the support provided throughout the course has been exceptional. Whether it's through the online forums, live Q&A sessions, or personalized feedback on assignments, I've always felt supported and encouraged to succeed.",
  },
  {
    name: "Naman Malhotra",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    profession: "iOS developer | Chitkara University",
    comment:
      "Furthermore, the support provided throughout the course has been exceptional. Whether it's through the online forums, live Q&A sessions, or personalized feedback on assignments, I've always felt supported and encouraged to succeed",
  },
  {
    name: "Manvi Grover",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    profession: "Full Stack Web Developer | Chitkara University",
    comment:
      "In short, this web development course has been nothing short of transformative. It has equipped me with the skills, knowledge, and confidence to pursue a career in web development with enthusiasm and assurance. I cannot recommend it highly enough to anyone looking to dive into the world of web development. Thank you to the entire team behind this phenomenal course!",
  },
];
const Review = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="1000px:w-[40%] 800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assests/animated-ch.png")}
            alt="business"
            width={400}
            height={400}
            className="rounded w-full"
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[35px]`}>
            Our Students Are{" "}
            <span className="text-gradient text-[#3558e1]">Our Strength</span>{" "}
            <br /> See What They Say About Us
          </h3>
          <br />
          <p className={`${styles.label} ml-7`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum rem
            totam atque repellat enim, corporis obcaecati harum eligendi iste
            dolorem voluptatum saepe? Dolore omnis dolorem atque perspiciatis?
            Ullam, ducimus similique!
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-[25px] md:grid-cols-2 md:grid-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)=:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px]">
        {reviews.map((i, index) => (
          <ReviewCard item={i} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Review;
