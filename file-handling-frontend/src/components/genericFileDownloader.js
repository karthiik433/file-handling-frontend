import {saveAs} from "file-saver";
import axios from "axios";


export default async function genericFileDownloader(urlEndPoint,fileName){


        console.log("downloading the excel file")
        try{
        const response = await axios.get(`http://localhost:8090/`+urlEndPoint,{responseType: "blob"});
        const blob = await response.data;
        const urlReference = URL.createObjectURL(new Blob([blob]));
        // const link = document.createElement('a');
        // link.href = urlReference;
        // link.setAttribute('download', 'ImageDataExcel.xlsx');
        // document.body.appendChild(link);
        // console.log("url created");
        // link.click();
        // link.remove();
        // console.log("blob ",urlReference);
        saveAs(urlReference,fileName);
        return urlReference;
        }
        catch(error){
            console.error(error);
        }

    
}