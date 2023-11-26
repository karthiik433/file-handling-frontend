import axios from "axios";
import { useState} from "react";
import {saveAs} from "file-saver";
// import XLSX from "xlsx";

 export default function ExcelDownload() {


    const [url,setUrl] = useState(null);

    const downlodExcel = async ()=>{
        console.log("downloading the excel file")
        if(url !== null){
            console.log("Revoked the url!! ")
            URL.revokeObjectURL(url);
        }
        const response = await axios.get("http://localhost:8090/downloadExcel",{responseType: "blob"});
        const blob = await response.data;
        console.log("response ",blob);
        const urlReference = URL.createObjectURL(new Blob([blob]));
        // const link = document.createElement('a');
        // link.href = urlReference;
        // link.setAttribute('download', 'ImageDataExcel.xlsx');
        // document.body.appendChild(link);
        // console.log("url created");
        setUrl(urlReference);
        // link.click();
        // link.remove();
        // console.log("blob ",urlReference);
        
        saveAs(urlReference,`ImageDataExcel.xlsx`);
    }

    return(
        <>
        <h1>Hi Welcome to excel download functionality</h1>
        <section>
            <button onClick={downlodExcel}>Download excel</button>
        </section>
        </>
    )
}