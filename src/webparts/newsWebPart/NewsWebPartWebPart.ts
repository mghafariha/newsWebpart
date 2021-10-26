import * as React from 'react';
import * as ReactDom from 'react-dom';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/webs";
import { SPComponentLoader } from '@microsoft/sp-loader';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'NewsWebPartWebPartStrings';
import NewsWebPart from './components/NewsWebPart';
import { INewsWebPartProps } from './entities/INewsWebPartProps';
const customStyleUrl: any = require('./styles/style.css');

export interface INewsWebPartWebPartProps {
  description: string;
  newsSiteUrl: string
  numberOfDisplayAnnoncements: number;
  numberOfDisplayNews: number;
  cssUrl: string;
  sliderInterval: number;
}

export default class NewsWebPartWebPart extends BaseClientSideWebPart<INewsWebPartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<INewsWebPartProps> = React.createElement(
      NewsWebPart,
      {
        description: this.properties.description,
        numberOfDisplayAnnoncements: this.properties.numberOfDisplayAnnoncements || 3,
        numberOfDisplayNews: this.properties.numberOfDisplayNews || 3,
        newsSiteUrl: this.properties.newsSiteUrl,
        cssUrl: this.properties.cssUrl,
        sliderInterval: this.properties.sliderInterval
      }
    );

    ReactDom.render(element, this.domElement);
  }
  protected async onInit(): Promise<void> {

    this.properties.cssUrl ? SPComponentLoader.loadCss(this.context.pageContext.site.absoluteUrl + this.properties.cssUrl) : SPComponentLoader.loadCss(customStyleUrl);


    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('newsSiteUrl', {
                  label: 'News Site Url'
                }),
                PropertyPaneSlider('numberOfDisplayNews', {
                  label: 'Please Enter Number of Display News: ',
                  min: 1,
                  max: 10,
                  step: 1
                }),
                ,
                PropertyPaneTextField('sliderInterval', {
                  label: "Slider Interval",
                  placeholder: '2'
                }),
                PropertyPaneSlider('numberOfDisplayAnnoncements', {
                  label: 'Please Enter Number of Display Annoncements: ',
                  min: 1,
                  max: 10,
                  step: 1
                }),
                PropertyPaneTextField('cssUrl', {
                  label: "NewsAnnoncement Css",
                  placeholder: 'Example : /siteassets/style.css'
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
