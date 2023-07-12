import React, { useEffect, useState } from 'react';
// import * as fs from "fs";




export const FileLoader = () => {

    // const dir = '/scripts'
    // const files = fs.readdirSync(dir)
    //
    // for (const file of files) {
    //     console.log(file)
    // }
}
    // const [files, setFiles] = useState({});
    //
    // useEffect(() => {
    //     const loadFiles = async () => {
    //         try {
    //             const response = await fetch(rawFiles);
    //             const fileNames = await response.text();
    //
    //             console.log(fileNames)
    //
    //             const loadedFiles = {};
    //             for (const fileName of fileNames) {
    //                 if (fileName.endsWith('.sh')) {
    //                     const fileResponse = await fetch(`/scripts/${fileName}`);
    //                     const fileContent = await fileResponse.text();
    //                     loadedFiles[fileName] = fileContent;
    //                 }
    //             }
    //
    //             setFiles(loadedFiles);
    //         } catch (error) {
    //             console.error('Error loading files:', error);
    //         }
    //     };
    //
    //     loadFiles();
    // }, []);

    // return (
    //     <div>
    //         {Object.entries(files).map(([fileName, content]) => (
    //             <div key={fileName}>
    //                 <h2>{fileName}</h2>
    //                 <pre>{content}</pre>
    //             </div>
    //         ))}
    //     </div>
    // );
//}

export default FileLoader;