import * as React from 'react';
import { Icon, PrimaryButton, Panel, DefaultButton, Stack, Image, ImageFit, Text, useTheme } from '@fluentui/react';
import { IRightSideButtonPaneWebPartProps } from './IRightSideButtonPaneProps';

const RightSideButtonPane: React.FC<IRightSideButtonPaneWebPartProps> = (props) => {
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);

  // Use Fluent UI theme to obtain semantic colors and dark mode info
  const theme = useTheme();
  const semanticColors = theme?.semanticColors;
  const isDarkTheme = !!theme?.isInverted;

  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);

  //Dark mode styles
  const cardBackground = semanticColors?.bodyBackground || 'var(--bodyBackground)';
  const textColor =  semanticColors?.bodyText || 'var(--bodyText)';
  const boxShadow= isDarkTheme ? '0 4px 12px rgba(255,255,255,0.4)' : '0 4px 12px rgba(0,0,0,0.1)';
  const imageBackground = isDarkTheme ? '#333333' : '#f5f5f5';
  const iconColor = semanticColors?.link || 'var(--link)' ;

  return (
    <Stack
      horizontal
      wrap
      tokens={{ childrenGap: 10 }}
      styles={{
        root: {
          background:cardBackground,
          borderRadius: 12,
          color:textColor,
          boxShadow: boxShadow,
          padding: 16,
          width: '100%',
          maxWidth: 700,
        },
      }}
    >
      {/* Left Section */}
      <Stack
        tokens={{ childrenGap: 8 }}
        styles={{ root: { flex: 1, minWidth: '250px' } }}
      >
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
          <Icon iconName={props.iconName || 'Contact'} styles={{ root: { fontSize: 24, color: iconColor } }} />
          <Text variant="large" styles={{ root: { fontWeight: 600 } }}>
            {props.title || 'Default Title'}
          </Text>
        </Stack>
        <Text>{props.description || 'Default description goes here.'}</Text>
        {props.buttonLabel && (
          <PrimaryButton
            text={props.buttonLabel}
            iconProps={{ iconName: props.buttonIcon || 'Add' }}
            onClick={openPanel}
          />
        )}
      </Stack>

      {/* Right Section (Image) */}
      <Image
        src={props.imageUrl || ''}
        alt={props.title}
        imageFit={ImageFit.cover}
        styles={{
          root: {
            flex: 1,
            minWidth: '200px',
            height: '160px',
            borderRadius: 8,
            background: imageBackground,
          },
        }}
      />

      {/* Popup Panel */}
      <Panel
        isOpen={isPanelOpen}
        onDismiss={closePanel}
        headerText="Links"
        closeButtonAriaLabel="Close"
      >
        <Stack tokens={{ childrenGap: 10 }}>
          {props.link1Label && (
            <PrimaryButton
              text={props.link1Label}
              href={props.link1Url}
              target={props.openInNewTab ? '_blank' : '_self'}
              iconProps={{ iconName: props.link1Icon || 'Link' }}
            />
          )}
          {props.link2Label && (
            <DefaultButton
              text={props.link2Label}
              href={props.link2Url}
              target={props.openInNewTab ? '_blank' : '_self'}
              iconProps={{ iconName: props.link2Icon || 'Link' }}
            />
          )}
          {props.link3Label && (
            <PrimaryButton
              text={props.link3Label}
              href={props.link3Url}
              target={props.openInNewTab ? '_blank' : '_self'}
              iconProps={{ iconName: props.link3Icon || 'Link' }}
            />
          )}
          {props.link4Label && (
            <DefaultButton
              text={props.link4Label}
              href={props.link4Url}
              target={props.openInNewTab ? '_blank' : '_self'}
              iconProps={{ iconName: props.link4Icon || 'Link' }}
            />
          )}
        </Stack>
      </Panel>
    </Stack>
  );
};

export default RightSideButtonPane;


/*
import * as React from 'react';
import { Icon, PrimaryButton, Panel, DefaultButton, Stack } from '@fluentui/react';
import styles from './RightSideButtonPane.module.scss';

interface IRightSideButtonPaneProps {
  title: string;
  description: string;
  iconName: string;
  buttonLabel: string;
  buttonIcon: string;
  imageUrl: string;
  openInNewTab: boolean;
  link1Label: string; link1Url: string; link1Icon: string;
  link2Label: string; link2Url: string; link2Icon: string;
  link3Label: string; link3Url: string; link3Icon: string;
  link4Label: string; link4Url: string; link4Icon: string;
}

const RightSideButtonPane: React.FC<IRightSideButtonPaneProps> = (props) => {
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);

  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);

  return (
    <div className={styles.card}>
    
      <div className={styles.cardLeft}>
        <div className={styles.headerRow}>
          <div className={styles.iconBox}>
            <Icon iconName={props.iconName || 'Contact'} />
          </div>
          <h3 className={styles.titleText}>{props.title || 'Default Title'}</h3>
        </div>
        <p className={styles.descriptionText}>{props.description || 'Default description goes here.'}</p>
        {props.buttonLabel && (
          <PrimaryButton
            text={props.buttonLabel}
            iconProps={{ iconName: props.buttonIcon || 'Add' }}
            onClick={openPanel}
            className={styles.mainButton}
          />
        )}
      </div>

   
      <div className={styles.cardRight}>
        {props.imageUrl ? (
          <img src={props.imageUrl} alt={props.title} />
        ) : (
          <div className={styles.placeholder}>No Image</div>
        )}
      </div>

 
      <Panel
        isOpen={isPanelOpen}
        onDismiss={closePanel}
        headerText="Links"
        closeButtonAriaLabel="Close"
      >
        <Stack tokens={{ childrenGap: 10 }}>
          {props.link1Label && (
            <PrimaryButton
              text={props.link1Label}
              href={props.link1Url}
              target={props.openInNewTab ? '_blank' : '_self'}
              iconProps={{ iconName: props.link1Icon || 'Link' }}
            />
          )}
          {props.link2Label && (
            <DefaultButton
              text={props.link2Label}
              href={props.link2Url}
              target={props.openInNewTab ? '_blank' : '_self'}
              iconProps={{ iconName: props.link2Icon || 'Link' }}
            />
          )}
          {props.link3Label && (
            <PrimaryButton
              text={props.link3Label}
              href={props.link3Url}
              target={props.openInNewTab ? '_blank' : '_self'}
              iconProps={{ iconName: props.link3Icon || 'Link' }}
            />
          )}
          {props.link4Label && (
            <DefaultButton
              text={props.link4Label}
              href={props.link4Url}
              target={props.openInNewTab ? '_blank' : '_self'}
              iconProps={{ iconName: props.link4Icon || 'Link' }}
            />
          )}
        </Stack>
      </Panel>
    </div>
  );
};

export default RightSideButtonPane;
*/