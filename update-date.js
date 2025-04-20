const fs = require('fs');
const path = require('path');

const currentDate = new Date().toISOString();
const keywords = ['单向历'];

fs.readdir('source/_posts', (err, files) => {
    if (err) {
        console.error("Error reading directory: ", err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file) === '.md') {
            fs.readFile(path.join('source/_posts', file), 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading file ${file}: `, err);
                    return;
                }

                const shouldUpdate = keywords.some(keyword => file.includes(keyword) || data.includes(keyword));

                if (shouldUpdate) {
                    const updatedData = data.replace(/date: .*/i, `date: ${currentDate}`);

                    fs.writeFile(path.join('source/_posts', file), updatedData, 'utf8', (err) => {
                        if (err) {
                            console.error(`Error writing file ${file}: `, err);
                            return;
                        }
                        console.log(`Updated date in ${file}`);
                    });
                }
            });
        }
    });
});
