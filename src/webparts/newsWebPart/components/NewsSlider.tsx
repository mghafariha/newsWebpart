import * as React from 'react';
import { useState , useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel/lib/js';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/NewsSlider.css';


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const NewsSlider=(props)=>{
   
    const formattedDate=(date)=>(date.getUTCDate()+" " + monthNames[date.getMonth()]+', ' + date.getUTCFullYear());
      
  return(
    <div className='colLeft'>
    {/* <span className={ styles.title }>Welcome to SharePoint!</span>
    <div style={{ backgroundImage: `url(${pic})` }} className={styles.image}>
      
       </div> */}
       <Carousel infinteloop
                 autoplay
               
              infiniteLoop={true}
              showStatus={false}
              showThumbs={false}
              dynamicHeight={true}
              >
                  {
                   props.newsList.map((a,index)=>{
                                                                            
                   return( <div className='image' key={index}>
                          
                  <img src={a.bannerImageUrl} alt="mobile1"/>
                  <div className="legend">
                      <div>{a.topicHeader}</div>
                      <div style={{fontSize:'18px',fontWeight:'bold',textTransform: 'uppercase'}}>{a.title}</div>
                      <div>{formattedDate(new Date(a.created)) }  {a.authorTitle}</div>
                      <div style={{marginTop:'10px'}}><a href={a.url} target = "_blank" data-interception="off" style={{color:'inherit',textDecoration: 'none'}}>Read more ...</a></div>
                  </div>  
                    </div>)
                   })   
                  }
         
          
       </Carousel>
  </div>
  )
}
export default NewsSlider;
