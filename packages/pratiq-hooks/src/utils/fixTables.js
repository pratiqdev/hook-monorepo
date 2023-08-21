import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));




function alignTableColumns(comment) {
    // Identify the beginning and end of the tables using regex
    const tableRegex = /(\* \|.*\n)+/g;

    return comment.replace(tableRegex, (table) => {
        // Split the table into lines
        const rows = table.trim().split('\n');

        // Split each line into cells and trim the whitespace
        const cells = rows.map(row => row.slice(2).split('|').map(cell => cell.trim()));

        // Find the maximum width of each column
        const columnWidths = [];
        cells.forEach(row => {
            row.forEach((cell, i) => {
                columnWidths[i] = Math.max(columnWidths[i] || 0, cell.length);
            });
        });

        // Align each row based on the maximum column widths
        const alignedRows = cells.map(row => {
            return row.map((cell, i) => cell.padEnd(columnWidths[i], ' ')).join(' | ');
        });

        // Reconstruct the table with the aligned rows, keeping the original "* |" prefix
        return alignedRows.map(row => '* |' + row + ' |').join('\n');
    });
}









// function alignTableColumns(comment) {
//     // Use a regex pattern to match tables
//     const tableRegex = /(\* \|\s*.*\s*\|\n)+/g;

//     return comment.replace(tableRegex, (table) => {
//         const rows = table.split('\n').map(row => row.slice(2).split('|').map(cell => cell.trim()));

//         // Determine the maximum width of each column
//         const columnWidths = rows[0].map((_, colIndex) =>
//             Math.max(...rows.map(row => row[colIndex] ? row[colIndex].length : 0))
//         );

//         // Align the content rows
//         const alignedRows = rows.map((row, rowIndex) => {
//             return row.map((cell, colIndex) => {
//                 // Special handling for alignment row
//                 if (rowIndex === 1) {
//                     return cell.startsWith(':') ? ':--'.padEnd(columnWidths[colIndex], '-') : '--'.padEnd(columnWidths[colIndex], '-');
//                 }

//                 return cell.padEnd(columnWidths[colIndex], ' ');
//             });
//         });

//         // Join the cells and rows back together
//         return alignedRows.map(row => '* | ' + row.join(' | ') + ' |').join('\n');
//     });
// }







// function alignTableColumns(comment) {
//     // Function to align a single table
//     // console.log('comment:', comment)
//     function alignTable(table) {
//         // Split the table into rows and columns
//         const rows = table.split('\n').map(row => row.split('|').slice(1, -1).map(cell => cell.trim()));

//         // Determine the maximum width of each column
//         const columnWidths = rows[0].map((_, colIndex) => Math.max(...rows.map(row => row[colIndex].length)));

//         // Adjust the alignment rows and content rows
//         for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
//             for (let colIndex = 0; colIndex < rows[0].length; colIndex++) {
//                 if (rowIndex === 1) {
//                     rows[rowIndex][colIndex] = (rows[rowIndex][colIndex].startsWith(':') ? ':--' : '--').padEnd(columnWidths[colIndex], '-');
//                 } else {
//                     rows[rowIndex][colIndex] = rows[rowIndex][colIndex].padEnd(columnWidths[colIndex], ' ');
//                 }
//             }
//         }

//         // Join the cells and rows back together
//         return rows.map(row => '| ' + row.join(' | ') + ' |').join('\n');
//     }

//     // Regular expression to match tables within the comment
//     const tableRegex = /\|\s*(?:[\w\s`():,\-\[\]]+\s*\|)+\s*\n(\|\s*[:\-]+\s*\|)+\s*\n(?:\|\s*[\w\s`():,\-\[\]]+\s*\|)+\s*/g;

//     console.log('table match:', comment.match(tableRegex))
//     // Replace each table with its aligned version
//     return comment.replace(tableRegex, alignTable);
// }

// The rest of your code remains unchanged

// function alignTableColumns(comment) {
//     // Split the comment into lines
//     const lines = comment.split('\n');

//     // Initialize variables to keep track of tables
//     let tables = [];
//     let currentTable = [];

//     // Iterate through the lines, looking for tables
//     lines.forEach((line, i) => {
//         if (line.trim().startsWith('|')) {
//             currentTable.push(line.trim().substring(2).trim());
//             // Check if it's the last line of the comment or if the next line doesn't start a table row
//             if (i === lines.length - 1 || !lines[i + 1].trim().startsWith('* |')) {
//                 tables.push(currentTable);
//                 currentTable = [];
//             }
//         }
//     });

//     // Function to align a single table
//     function alignTable(table) {
//         // Split rows into columns
//         const rows = table.map(row => row.split('|').slice(1, -1).map(cell => cell.trim()));

//         // Determine the maximum width of each column
//         const columnWidths = rows[0].map((_, colIndex) =>
//             Math.max(...rows.map(row => row[colIndex].length))
//         );

//         // Adjust the alignment rows
//         rows[1] = rows[1].map((cell, i) => cell.startsWith(':') ? ':--'.padEnd(columnWidths[i], '-') : '--'.padEnd(columnWidths[i], '-'));

//         // Align the content rows
//         for (let rowIndex = 2; rowIndex < rows.length; rowIndex++) {
//             for (let colIndex = 0; colIndex < rows[rowIndex].length; colIndex++) {
//                 rows[rowIndex][colIndex] = rows[rowIndex][colIndex].padEnd(columnWidths[colIndex], ' ');
//             }
//         }

//         // Align the header row
//         for (let colIndex = 0; colIndex < rows[0].length; colIndex++) {
//             rows[0][colIndex] = rows[0][colIndex].padEnd(columnWidths[colIndex], ' ');
//         }

//         // Join the cells and rows back together
//         return rows.map(row => '* | ' + row.join(' | ') + ' |').join('\n');
//     }

//     // Reconstruct the comment, replacing the tables with aligned versions
//     let commentIndex = 0;
//     let result = '';
//     tables.forEach(table => {
//         const start = comment.indexOf('* ' + table[0], commentIndex);
//         result += comment.substring(commentIndex, start) + alignTable(table);
//         commentIndex = start + ('* ' + table.join('\n')).length;
//     });
//     result += comment.substring(commentIndex);

//     return result;
// }




// Function to process an individual file
// function processFile(filePath) {
//     try {
//         const content = fs.readFileSync(filePath, 'utf-8');

//         const updatedContent = content.replace(/\/\*\*([\s\S]+?)\*\//g, (comment) => {
//             return comment.replace(/\|[\s\S]+?\|/g, (table) => {
//                 console.log(table)
//                 return alignTableColumns(table);
//             });
//         });

//         fs.writeFileSync(filePath, updatedContent, 'utf-8');
//         console.log(`Processed file: ${filePath}`);
//     } catch (err) {
//         console.error(`Error processing file ${filePath}:`, err);
//     }
// }
function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');

        const updatedContent = content.replace(/\/\*\*([\s\S]+?)\*\//g, (comment) => {
            console.log('original comment:\n', comment)
            const cont = alignTableColumns(comment)
            console.log('new comment:\n', cont)
            return cont
        });

        fs.writeFileSync(filePath, updatedContent, 'utf-8');
        console.log(`Processed file: ${filePath}`);
    } catch (err) {
        console.error(`Error processing file ${filePath}:`, err);
    }
}

const directoryPath = path.join(__dirname, '../hooks');

// Read the directory containing the hook files
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Process each hook file
    files.forEach((file) => {
        if (file.includes('useClamp.tsx')) {
            processFile(path.join(directoryPath, file));
        }
    });
});
