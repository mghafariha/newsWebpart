import * as React from 'react';
import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel/lib/js';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/NewsSlider.css';


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const NewsSlider = (props) => {
  console.log('slides', props);
  const formattedDate = (date) => (date.getUTCDate() + " " + monthNames[date.getMonth()] + ', ' + date.getUTCFullYear());
  const [autoplay, setAutoplay] = useState(true);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [sliderInterval, setSliderInterval] = useState(1);
  useEffect(() => {
    let interv = (!props.interval || props.interval == 0) ? 2 : props.interval;
    console.log('interv1', interv);
    interv = interv * 1000;
    console.log('interv', interv);
    setSliderInterval(interv);
  }, [props.interval]);
  return (
    <div className='colLeft'>
      {/* <span className={ styles.title }>Welcome to SharePoint!</span>
    <div style={{ backgroundImage: `url(${pic})` }} className={styles.image}>
      
       </div> */}

      {props.newsList.length > 0 && <Carousel

        showArrows={true}
        showStatus={true}
        showIndicators={true}
        infiniteLoop={true}
        showThumbs={false}
        useKeyboardArrows={true}
        autoPlay={autoplay}
        stopOnHover={true}
        swipeable={true}
        dynamicHeight={true}
        emulateTouch={true}
        autoFocus={true}
        thumbWidth={true}
        selectedItem={selectedSlide}
        interval={sliderInterval}
      // transitionTime={500}
      >

        {
          props.newsList.map((a, index) => {

            return (<div className='image' key={index}>

              <img src={a.bannerImageUrl} alt="mobile1" />
              <div className="legend">
                <div>{a.topicHeader}</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>{a.title}</div>
                <div>{formattedDate(new Date(a.created))}  {a.authorTitle}</div>
                <div style={{ marginTop: '10px' }}><a href={a.url} target="_blank" data-interception="off" style={{ color: 'inherit', textDecoration: 'none' }}>Read more ...</a></div>
              </div>
            </div>)
          })
        }


      </Carousel>
      }
    </div>
  )
}
export default NewsSlider;
