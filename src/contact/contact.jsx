import React, { useState } from 'react'



import { createContext } from 'react'
import runChat from '../config/gemini';
import { useSearchParams } from 'react-router-dom';



export const Context = createContext();


const ContextProvider =(props)=> {

    
    const [input,setinput]  = useState("");
    const [recentprompt,setrecentprompt] = useState();
    const [prevpromt,setprevprompt]  = useState([]);
    const [showresult,setshowresult] = useState(false);
    let response; 
    const [loading,setloading] = useState(false);
    const [resultdata,setresultdata] = useState("");

    const delaypara = (index,nextword)=>{
         setTimeout(function(){
        setresultdata(prev=>prev+nextword);
         },75*index)
    }

const newChat=()=>{
  setloading(false)
  setshowresult(false)
}

    const onSent = async (prompt)=>{
        setresultdata("")
        setloading(true)
        setshowresult(true)
        

        let response ; 
        if(prompt!== undefined){
          response = await runChat(prompt);
          setrecentprompt(prompt) ; 
        }else{
            setprevprompt(prev=>[...prev,input])
            setrecentprompt(input)
            response  = await runChat(input)
        }
   


    let responseArray = response.split("**");
    let newResponse ="" ; 
    for(let i = 0; i< responseArray.length;i++){
      if(i=== 0 || i%2 !== 1){
        newResponse+=responseArray[i];
      }else{
        newResponse+="<b>"+responseArray[i]+"</br>"
      }
     
    }


    let newresponse2 = newResponse.split("*").join("</br>")
    let newresponsearray = newresponse2.split(" ");
    for(let i= 0 ;i< newresponsearray.length ;i++){
      const nextword  = newresponsearray[i];
      delaypara(i,nextword+" ");
    }
      setresultdata(newresponse2);
      setloading(false)
      setinput("");

    }


    const contextValue = {
      prevpromt,setprevprompt,onSent,setrecentprompt,recentprompt,recentprompt,showresult,loading,resultdata,input,setinput,newChat
    }

    return (
        <Context.Provider value = {contextValue}>
           {props.children}
        </Context.Provider>
    )
}


export default ContextProvider; 

