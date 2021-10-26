import * as React from 'react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";



import { INewsWebPartProps } from '../entities/INewsWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import NewsSlider from './NewsSlider';
import Annoncements from './Annoncements';
import { INews  } from '../entities/INews';
import { INewsWebPartState } from '../entities/INewsWebPartState';
import { Web } from "@pnp/sp/webs";
import { IAnnoncement } from '../entities/IAnnoncement';
export default class NewsWebPart extends React.Component<INewsWebPartProps, INewsWebPartState> {

  constructor(props) {

    super(props);
    this.state = {  
       newsList: [] as INews[],
       annoncements:[] as IAnnoncement[]
     
    }; 
    
  }
  public async componentDidMount(){
    console.log('props',this.props);
    const web = Web(`${this.props.newsSiteUrl}`);
    const r = await web();
   
      //AuthorId ,BannerImageUrl ,Created,Title,SliderDisplayOrder,Description,OData__TopicHeader,FirstPublishedDate
     let newsItems = await web.lists.getByTitle('Site Pages').items.filter('SliderDisplayOrder ne 0 and SliderDisplayOrder ne null').select(`AuthorId,Author/Title,BannerImageUrl ,Created,Title,SliderDisplayOrder,FirstPublishedDate,OData__TopicHeader,FileLeafRef`).expand(`Author`).orderBy("SliderDisplayOrder",true).top(this.props.numberOfDisplayNews).get();
     newsItems = newsItems.sort((a, b) => (a.SliderDisplayOrder > b.SliderDisplayOrder ? 1: -1));
    console.log('newsItem',newsItems);
     const news=newsItems.map((a)=>({title:a.Title,bannerImageUrl :a.BannerImageUrl.Url,authorTitle:a.Author.Title ,created:a.FirstPublishedDate,sliderDisplayOrder:a.SliderDisplayOrder,topicHeader:a.OData__TopicHeader,url:`${this.props.newsSiteUrl}/SitePages/${a.FileLeafRef}`})) as INews[]
     this.setState({...this.state,newsList:news});
    //
    const annonceItems = await web.lists.getByTitle('Announcements').items.select(`Title,Details,IconName,BackgroundColor,NewsUrl`).orderBy("Created",false).top(this.props.numberOfDisplayAnnoncements).get();
   console.log('annonces',annonceItems);
    const annoncees=annonceItems.map((a)=>({title:a.Title, details:a.Details,iconName:a.IconName,backgroundColor:a.BackgroundColor,newsUrl:a.NewsUrl,isActive:false})) as IAnnoncement[];
    this.setState({...this.state,annoncements:annoncees});
      }
  public render(): React.ReactElement<INewsWebPartProps> {
    return (
      <div className='newsWebPart' >
       
          <div className='newsContainer'>
           
          <NewsSlider newsList={this.state.newsList} />
          <Annoncements  annoncements={this.state.annoncements}/>
        </div>
      </div>
    );
  }
}
