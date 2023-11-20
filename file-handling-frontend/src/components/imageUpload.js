import {useState} from "react"
import axios from "axios";


export default function ImageUpload(){

    // const [request,setRequest] = useState(null);
    const downloadFile = {
        url: ""
    }

    const request = {
        file: null,
        name: "",
        address: "",
        number:  ""
    }

    const uploadImage = async ()=>{

        const formData = new FormData();
        formData.append("image",request.file);
        formData.append("name",request.name);
        formData.append("address",request.address);
        formData.append("number",request.number);

        // for (const [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        //   }

        try{
        const response = await axios.post("http://localhost:8090/uploadImage",formData);
        console.log(response);
        }catch(error){
            console.error(error);
        }

    }

    const handleDownload = async () => {

        const response = await axios.get("http://localhost:8090/getImage/2",{responseType: "blob"});
        console.log("response",response);
        const blob =  response.data;
        downloadFile.url = URL.createObjectURL(blob);
        URL.revokeObjectURL(downloadFile.url);

    }

    return (
        <div>
            <header>
                <h2>Hi Welcome to image upload section</h2>
            </header>
            <div>
                <div>
                <input type="file" onChange ={(e)=>request.file = e.target.files[0]} />
                <button type="sumbit" onClick={uploadImage}>upload</button>
                </div>
                <br/>
                <div>
                <span>Enter your name: </span>
                <input type="text"  onChange={(e)=>request.name = e.target.value}/> 
                </div>
                <br/>
                <div>
                <span>Enter your address: </span>
                <input type="text"  onChange={(e)=>request.address = e.target.value}/> 
                </div>
                <br/>
                <div>
                <span>Enter your phone number: </span>
                <input type="text"  onChange={(e)=>request.number = e.target.value}/> 
                </div>    
            </div>
            <button onClick={uploadImage} >Upload data</button>
            <a href={downloadFile.url} download={"image.png"} onClick={handleDownload}>Download</a>
        </div>
    )
}