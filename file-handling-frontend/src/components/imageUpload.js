import axios from "axios";
import {useEffect, useState} from "react";


export default function ImageUpload(){

    // const [request,setRequest] = useState(null);
    const [url,setUrl] = useState("");
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

    const handleDownload = async (e) => {
        console.log("value of anchor tag ",e)
        const imageNumber = e;
        try{
        const response = await axios.get(`http://localhost:8090/getImage/${imageNumber}`,{responseType: "blob"});
        console.log("response",response);
        const blob = await response.data;
        console.log("blob",blob);
        const updatedUrl = URL.createObjectURL(new Blob([blob]));
        console.log("updated url ",updatedUrl);
        setUrl(updatedUrl)
        console.log("updated the url using set method",url)
        URL.revokeObjectURL(updatedUrl);
        }
        catch(error){
            console.error(error);
        }
        

    }

    useEffect( ()=>{

        async function getImagesMetaData (){
            const response = (await axios.get(`http://localhost:8090/getImages`));
            const responseData = response.data.images;
            console.log("response data "+responseData);
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

            <img src = {url} alt="cant find dude"></img>
            
            {imageData.length>0 && imageData.map((item,index)=>{

                return(
                    <div key ={index}>
                        <span>{item.imageName}</span>
                        <button><a href={url} download={`${item.imageName}.png`} rel="noreferrer" target="_blank" onClick={()=>{handleDownload(item.id)}}>Download image</a></button>
                    </div>
                );
            })}
        </div>
    )
}