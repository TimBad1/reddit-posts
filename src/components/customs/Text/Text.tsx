import React from 'react';
import styles from './text.module.css';
import classNames from 'classnames';

export enum EColors {
  black = 'black',
  orange = 'orange',
  green = 'green',
  white = 'white',
  grayF4 = 'grayF4',
  greyF3 =  'greyF3', 
  greyD9 =  'greyD9', 
  greyC4 = 'greyC4', 
  grey99 = 'grey99', 
  grey66 = 'grey66',
}

type TSizes = 28 | 20 | 16 | 14 | 12 | 10;

interface ITextProps {
  As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  children?: React.ReactNode;
  size: TSizes;
  mobileSize?: TSizes;
  tabletSize?: TSizes;
  desctopSize?: TSizes;
  color?: EColors;
  bold?: boolean;
}

export function Text(props: ITextProps) {
  const { 
    As = 'span', 
    color = EColors.black, 
    bold = false,
    children, 
    size, 
    mobileSize, 
    tabletSize, 
    desctopSize
  } = props;
  const classes = classNames(
    styles[`s${size}`],
    styles[color],
    { [styles.bold]: bold },
    { [styles[`m${mobileSize}`]]: mobileSize},
    { [styles[`t${tabletSize}`]]: tabletSize},
    { [styles[`d${desctopSize}`]]: desctopSize},
    
  )
  return (
    <As className={classes}>
      {children}
    </As>
  );
}
