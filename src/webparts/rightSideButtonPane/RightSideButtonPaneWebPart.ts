import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import RightSideButtonPane from './components/RightSideButtonPane';

export interface IRightSideButtonPaneWebPartProps {
  title: string;
  description: string;
  iconName: string;
  buttonLabel: string;
  buttonIcon: string;
  imageUrl: string;
  openInNewTab: boolean;
  isDarkTheme:boolean;
  link1Label: string; link1Url: string; link1Icon: string;
  link2Label: string; link2Url: string; link2Icon: string;
  link3Label: string; link3Url: string; link3Icon: string;
  link4Label: string; link4Url: string; link4Icon: string;


}

export default class RightSideButtonPaneWebPart extends BaseClientSideWebPart<IRightSideButtonPaneWebPartProps> {

  private _isDarkTheme: boolean = false;
  public render(): void {
    const element: React.ReactElement<IRightSideButtonPaneWebPartProps> = React.createElement(
      RightSideButtonPane,
      {
        title: this.properties.title,
        description: this.properties.description,
        iconName: this.properties.iconName,
        buttonLabel: this.properties.buttonLabel,
        buttonIcon: this.properties.buttonIcon,
        imageUrl: this.properties.imageUrl,
        openInNewTab: this.properties.openInNewTab,
        link1Label: this.properties.link1Label,
        link1Url: this.properties.link1Url,
        link1Icon: this.properties.link1Icon,
        link2Label: this.properties.link2Label,
        link2Url: this.properties.link2Url,
        link2Icon: this.properties.link2Icon,
        link3Label: this.properties.link3Label,
        link3Url: this.properties.link3Url,
        link3Icon: this.properties.link3Icon,
        link4Label: this.properties.link4Label,
        link4Url: this.properties.link4Url,
        link4Icon: this.properties.link4Icon,
        isDarkTheme: this._isDarkTheme,
        semanticColors: (this.context as any).theme?.semanticColors
      }
    );

    ReactDom.render(element, this.domElement);
  }
  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {

      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || '#000');
      this.domElement.style.setProperty('--bodyBackground', semanticColors.bodyBackground || '#fff');
      this.domElement.style.setProperty('--link', semanticColors.link || '#0078d4');
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || '#005a9e');

    }

  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: "Configure Right Side Button Pane" },
          groups: [
            {
              groupName: "Card Settings",
              groupFields: [
                PropertyPaneTextField('title', { label: 'Title' }),
                PropertyPaneTextField('description', { label: 'Description', multiline: true }),
                PropertyPaneTextField('iconName', { label: 'Card Icon Name' }),
                PropertyPaneTextField('buttonLabel', { label: 'Main Button Label' }),
                PropertyPaneTextField('buttonIcon', { label: 'Main Button Icon' }),
                PropertyPaneTextField('imageUrl', { label: 'Image URL' }),
                PropertyPaneToggle('openInNewTab', { label: 'Open links in new tab?', onText: 'Yes', offText: 'No' })
              ]
            },
            {
              groupName: "Popup Links",
              groupFields: [
                PropertyPaneTextField('link1Label', { label: 'Link 1 Label' }),
                PropertyPaneTextField('link1Url', { label: 'Link 1 URL' }),
                PropertyPaneTextField('link1Icon', { label: 'Link 1 Icon' }),
                PropertyPaneTextField('link2Label', { label: 'Link 2 Label' }),
                PropertyPaneTextField('link2Url', { label: 'Link 2 URL' }),
                PropertyPaneTextField('link2Icon', { label: 'Link 2 Icon' }),
                PropertyPaneTextField('link3Label', { label: 'Link 3 Label' }),
                PropertyPaneTextField('link3Url', { label: 'Link 3 URL' }),
                PropertyPaneTextField('link3Icon', { label: 'Link 3 Icon' }),
                PropertyPaneTextField('link4Label', { label: 'Link 4 Label' }),
                PropertyPaneTextField('link4Url', { label: 'Link 4 URL' }),
                PropertyPaneTextField('link4Icon', { label: 'Link 4 Icon' })
              ]
            }
          ]
        }
      ]
    };
  }
}