import { memo } from 'react';
import content from './content.module.scss';
import Image from "next/image";

interface CourseListProps {
  courses: ICourse[];
}

// Компонент для списка курсов
function CourseList({ courses }: CourseListProps) {
  return (
    <div className={`${content.frame}`}>
      {courses.map(course => (
        <div key={course.id} className={`${content.card}`}>
          <div className={`${content.cardImg}`} style={{ backgroundColor: course.bgColor }}>
            <Image src={course.image} alt="icon" width={144} height={144} priority />
          </div>
          <div className={`${content.cardTitle}`}>{course.name}</div>
        </div>
      ))}
    </div>
  );
}

export default memo(CourseList);
