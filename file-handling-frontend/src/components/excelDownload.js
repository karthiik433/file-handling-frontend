import { useState} from "react";
import genericFileDownloader from "./genericFileDownloader";
import {saveAs} from "file-saver";



 export default function ExcelDownload() {


    const [url,setUrl] = useState(null);

    const downloadPdf =  async ()=>{

        const anchorUrl = await downlodFile("downloadPdf","cricketerPdf.pdf");
        saveAs(anchorUrl,"cricketerPdf.pdf");

    }

    const downloadExcel = async ()=>{

        const anchorUrl = await downlodFile("downloadExcel","imageDataExcel.xlsx");
        saveAs(anchorUrl,"imageDataExcel.xlsx");
    }

    const viewPdf = async () =>{

        const anchorUrl = await downlodFile("downloadPdf","cricketerPdf.pdf");
        setUrl(anchorUrl);
    }

    

    const downlodFile = async (endPoint,fileName)=>{
        console.log("downloading the excel file")
        if(url !== null){
            console.log("Revoked the url!! ")
            URL.revokeObjectURL(url);
        }
        return await genericFileDownloader(endPoint,fileName);

    }

    return(
        <>
        <h1>Hi Welcome to excel download functionality</h1>
        <iframe src={url} width={"100%"} height={"500px"} />
        <section>
            <button onClick={downloadExcel}>Download excel</button>
            <button onClick={downloadPdf}>Download pdf</button>
            <button onClick={viewPdf}>View Pdf</button>
        </section>
        </>
    )
}