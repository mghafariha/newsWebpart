import * as React from 'react';
import { useState , useEffect } from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

const Annoncement=(props)=>{
   const [isActive,setActive]=useState(false);
    const toggleClass=()=>{
      props.changeActiveStatus(props.index); 
    }
    console.log('props',props);
    return (<div className='annoncement' style={{backgroundColor:`${props.backgroundColor}` ,height:`${props.height}%`}}>
             <div className='annoncementIcon' ><span   onClick={()=>toggleClass()}><Icon  iconName={`${props.iconName}`|| 'MegaphoneSolid'} /></span></div>
             <div className='annoncementText'>
                <div className='annoncementTitle'>{props.title}</div> 
                <div className='annoncementBody'>{props.details}</div>
                 </div>
    </div>)
}
export default Annoncement;