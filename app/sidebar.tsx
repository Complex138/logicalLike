import { useState, useEffect, memo } from 'react';
import nav from './nav.module.scss';

interface MenuProps {
    courses: ICourse[];
    onTagSelect: (tag: string) => void;
}

function Sidebar({ courses, onTagSelect }: MenuProps) {
    const [tags, setTags] = useState<string[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>('');

    useEffect(() => {
        const allTags = courses.reduce<string[]>((acc, course) => {
            course.tags.forEach(tag => {
                if (!acc.includes(tag)) {
                    acc.push(tag);
                }
            });
            return acc;
        }, []);

        setTags(allTags);
    }, [courses]);

    const handleTagSelect = (tag: string) => {
        if (tag !== selectedTag) {
            setSelectedTag(tag);
            onTagSelect(tag);
            console.log("TAG: ", tag);
        }
    };

    return (
        <div className={nav.sidebar}>
            <ul>
                <li key={"all"}>
                    <a href={`#all`} className={`${nav.link} ${selectedTag === '' ? nav.linkActive : ''}`} onClick={() => handleTagSelect('')}>
                        {"Все темы"}
                    </a>
                </li>
                {tags.map(tag => (
                    <li key={tag}>
                        <a href={`#${tag}`} className={`${nav.link} ${selectedTag === tag ? nav.linkActive : ''}`} onClick={() => handleTagSelect(tag)}>
                            {tag}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default memo(Sidebar);
