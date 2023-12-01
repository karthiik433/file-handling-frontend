import { useState} from "react";
import genericFileDownloader from "./genericFileDownloader";


 export default function ExcelDownload() {


    const [url,setUrl] = useState(null);

    const downloadPdf = ()=>{

        downlodFile("downloadPdf","cricketerPdf.pdf")
    }

    const downloadExcel = ()=>{

        downlodFile("downloadExcel","imageDataExcel.xlsx")
    }

    const downlodFile = async (endPoint,fileName)=>{
        console.log("downloading the excel file")
        if(url !== null){
            console.log("Revoked the url!! ")
            URL.revokeObjectURL(url);
        }
        const anchorUrl = await genericFileDownloader(endPoint,fileName);
        setUrl(anchorUrl);
    }

    return(
        <>
        <h1>Hi Welcome to excel download functionality</h1>
        <section>
            <button onClick={downloadExcel}>Download excel</button>
            <button onClick={downloadPdf}>Download pdf</button>
        </section>
        </>
    )
}