import React,{useState} from 'react';
import "./RightSide.css";
import Navbar from '../Navbar/Navbar';
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModal/ShareModal';
const RightSide=()=>{
    const [ModalOpen,setModalOpen]=useState(false);
    return(
        <div className="RightSide">
            <Navbar/>
            <TrendCard/>
            <button className='trend-share' onClick={()=>setModalOpen(true)}>Share</button>
            {ModalOpen && <ShareModal onClose={()=>setModalOpen(false)}/>}
        </div>
    )

}
export default RightSide;