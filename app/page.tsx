"use client"
import { useState, useEffect, memo } from 'react';
import main from './main.module.scss';
import Sidebar from './sidebar';
import CoursesList from './coursesList';

function Home() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://logiclike.com/docs/courses.json');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
      }
    };

    fetchCourses().then(coursesData => {
      const courses: ICourse[] = coursesData.map((course: any) => ({
        name: course.name,
        id: course.id,
        image: course.image,
        bgColor: course.bgColor,
        tags: course.tags,
      }));
      setCourses(courses);
    }).catch(error => {
      console.error('Error loading courses:', error);
    });
  }, []);

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
  };

  const filteredCourses = selectedTag ? courses.filter(course => course.tags.includes(selectedTag)) : courses;

  return (
    <main className={`${main.main}`}>
      <Sidebar courses={courses} onTagSelect={handleTagSelect} />
      <CoursesList courses={filteredCourses} />
    </main>
  );
}

export default memo(Home);
