export default function classNames(...classes: (string | Record<string, boolean> | undefined)[]): string {
    const classNamesArray: string[] = [];

    classes.forEach(classItem => {
        if (!classItem) return;
        if (typeof classItem === 'string') {
            classNamesArray.push(classItem);
        } else if (typeof classItem === 'object') {
            Object.keys(classItem).forEach(key => {
                if (classItem[key]) {
                    classNamesArray.push(key);
                }
            });
        }
    });

    return classNamesArray.join(' ');
}