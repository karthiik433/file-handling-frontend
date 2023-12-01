import axios from "axios";
import {useEffect, useState} from "react";
import {saveAs} from "file-saver";
import genericFileDownloader from "./genericFileDownloader";
import "../css/ImageUpload.css";

export default function ImageUpload(){

    const [url,setUrl] = useState("");
    const [imageData,setImageData] = useState([]);

    const request = {
        file: null,
        name: "",
        description: ""
    } ;

    const uploadImage = async ()=>{

        const formData = new FormData();
        formData.append("image",request.file);
        formData.append("name",request.name);
        formData.append("description",request.description);

        
        try{
        const response = await axios.post("http://localhost:8090/uploadImage",formData);
        request.file = null;
        request.name = "";
        request.description = "";
        console.log(response);
        }catch(error){
            console.error(error);
        }

    }

    const handleDownload = async (e,imageName) => {
        
        if(url !== null ){
            URL.revokeObjectURL(url);
            console.log("url revoked!!");
        }
        const anchorUrl = await genericFileDownloader(`getImage/${e}`,`${imageName}.png`)
        setUrl(anchorUrl);
        

    }

    useEffect( ()=>{

        async function getImagesMetaData (){
            const response = (await axios.get(`http://localhost:8090/getImages`));
            const responseData = response.data.images;
            setImageData([...responseData]);
        }
        console.log("Fetching images meta data");
        getImagesMetaData();

        return () => {setImageData([])};

    },[url]);

    return (
        <div>
            <header>
                <h2>Hi Welcome to image upload section</h2>
            </header>
            <section>
                <div>
                <input type="file" onChange ={(e)=>request.file = e.target.files[0]} />
                </div>
                <br/>
                <div>
                <span>Enter the name of cricketer: </span>
                <input type="text"  onChange={(e)=>request.name = e.target.value}/> 
                </div>
                <br/>
                <div>
                <span>Enter the description: </span>
                <input type="text"  onChange={(e)=>request.description = e.target.value}/> 
                </div>  
            </section>
            <br></br>
            <button onClick={uploadImage} >Upload data</button>
            <div>
            <br></br>
            {url.length > 1 && <img src = {url} alt="Unable to load image" style={{height:"200px",width:"400px"}}></img>}
            <br></br>
            <br></br>
            </div>
            <div className="tableContainer"> 
            <table className="table">
            <thead>
                <tr>
                <th>Sl.No</th>
                <th>Name of cricketer</th>
                <th>Image link</th>
                </tr> 
            </thead>
            <tbody>
            {imageData.length>0 && imageData.map((item,index)=>{

             return(
                 <tr key ={index}>
                <td>{index+1}</td>
                <td>{item.imageName}</td>
                <td><a href={url} onClick={(e)=>{e.preventDefault();handleDownload(item.id,item.imageName)}}>Download</a></td>
                </tr>
                   );
            })}
            </tbody>
            </table>
            </div>
            
        </div>
    )
}