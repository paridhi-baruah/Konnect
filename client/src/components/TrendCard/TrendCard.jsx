import React from 'react';
import "./TrendCard.css";
import { TrendData } from '../../Data/TrendData';
const TrendCard=()=>{
    return(
        <div className="TrendCard">
            <h2>Trends for your</h2>
            {TrendData.map((trend,id)=>{
                return(
                    <div className="trendgrid">
                        <h3>#{trend.name}</h3>
                        <p>{trend.shares}k shares</p>
                    </div>
                )})}
        </div>
    )

}
export default TrendCard;