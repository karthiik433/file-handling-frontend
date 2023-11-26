import axios from "axios";
import {useEffect, useState} from "react";
import {saveAs} from "file-saver";


export default function ImageUpload(){

    const [url,setUrl] = useState(null);
    const [imageData,setImageData] = useState([]);

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

    const handleDownload = async (e,imageName) => {
        if(url !== null){
            URL.revokeObjectURL(url);
            console.log("url revoked!!");
        }
        console.log("value of anchor tag ",e)
        const imageNumber = e;
        try{
        const response = await axios.get(`http://localhost:8090/getImage/${imageNumber}`,{responseType: "blob"});
        const blob = await response.data;
        console.log("response ",blob);
        const urlReference = URL.createObjectURL(new Blob([blob]));
        console.log("url created")
        setUrl(urlReference);
        saveAs(urlReference,`${imageName}.png`);
        }
        catch(error){
            console.error(error);
        }
        

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
            </section>
            <button onClick={uploadImage} >Upload data</button>
            <div>
            <img src = {url} alt="Unable to load image" style={{height:"200px",width:"400px"}}></img>
            </div>
            {imageData.length>0 && imageData.map((item,index)=>{

                return(
                    <div key ={index}>
                        <span>{item.imageName}</span>
                        <button onClick={()=>{handleDownload(item.id,item.imageName)}}>Download {item.imageName}</button>
                    </div>
                );
            })}
        </div>
    )
}