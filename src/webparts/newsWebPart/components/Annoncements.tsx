import * as React from 'react';

import { useState , useEffect } from 'react';
import Annoncement from './Annoncement';
const Annoncements=(props)=>{
  
    const [annoncements,chengeAnnonce]=useState([...props.annoncements]);
    useEffect(() => {
      let items=props.annoncements;
       items=[...items.map(a=>({...a,height:Math.floor(100/items.length)+1}))];
       
        chengeAnnonce([...items]);
        console.log('a',items);
    }, [props.annoncements]);
    const changeActiveStatus=(index)=>{

        let annItems=annoncements;
        annItems=annItems.map((a,i)=>({...a,isActive:(i==index?!a.isActive:false )} ) );

        const isOneIsActive=annItems.filter(a=>a.isActive);
         annItems=annItems.map(a=>({...a, height:isOneIsActive.length==1?(a.isActive? 60:(Math.floor(40/(annoncements.length-1))+1)):Math.floor(100/annoncements.length)+1}))
        chengeAnnonce([...annItems]);
    }
  return(
      
    <div className='colRight'>
        {annoncements.map((a,index)=>{
           return(<Annoncement {...a}  key={index} index={index} changeActiveStatus={changeActiveStatus}  />)
        })}
    
  </div>
  )
}
export default Annoncements;