import React, { useContext, useState } from 'react'
import './sidebar.css'

import { Link } from 'react-router-dom'
import { Context } from '../../contact/contact'
import {assets} from '../../assets/assets'
const Sidebar = () => {

    const [extended,setextended] = useState(false);

    const {onSent,prevpromt,setrecentprompt ,newChat} = useContext(Context);

    const loadprompt = async(prompt)=>{
      setrecentprompt(prompt)
         await  onSent(prompt);
    }
  return (
    <div>
     <div className="sidebar">
        <div className="top">
          <img className="menu"
          src={assets.menu_icon} onClick={()=>setextended(!extended)} alt="" />
          <div onClick={()=>newChat()} className="new-chat">
    <img src={assets.plus_icon} alt="" />
            {extended?   <p >new chat</p>:null}
         
          </div>
          {extended? <div className="recent">
            <p className="recent-title">
                  Recent
            </p>
            {prevpromt.map((item,index)=>{
              return (
              <div onClick={()=>loadprompt(item)} className="recent-entry">
               <img src={assets.message_icon} alt="" />
               <p>{item.slice(0,185)}...</p>
            </div>)
            })}
            
          </div> :null}
         
        </div>
        <div className="bottom">


            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended? <p>Help</p>:null}
                    
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended? <p>Activity</p>:null}
                    
                   
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.send_icon} alt="" />
                    {extended?   <p>Settings</p>:null}
                    
                  
                </div>
            </div>
        </div>
     </div>
    </div>
  )
}

export default Sidebar;
