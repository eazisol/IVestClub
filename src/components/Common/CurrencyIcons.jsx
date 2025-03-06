import React from 'react'
import ethereum from "../../assets/image/icons/ethereum.png"
import btc from "../../assets/image/icons/btc.png"
import usdt from "../../assets/image/icons/usdt.png"
import vector from "../../assets/image/icons/vector.png";
import miniGraph from "../../assets/image/miniGraph.png";
import ChartGraph from "../../assets/image/LargeGraph.png";
import SpaceX from '../../assets/image/spaceX.png'
export const Ethereum = ({size=20}) => {
  return (
    <img src={ethereum} style={{height : `${size}px` , width : `${size}px`}} />
  )
}
export const MiniGraph = ({size=20}) => {
  return (
    <img src={miniGraph} style={{height : `${size}px` , width : `${size+30}px`}} />
  )
}
export const spaceX = ({size=20}) => {
  return (
    <img src={SpaceX} style={{height : `${size}px` , width : `${24}px`}} />
  )
}

export const LargeGraph = ({size=20}) => {
  return (
    <img src={ChartGraph} style={{height : `${size}px` , width : `${size+210}px`}} />
  )
}

export const Bitcoin = ({size=20}) => {
    return (
      <img src={btc} style={{height : `${size}px` , width : `${size}px`}} />
    )
  }
  
  export const Usdt = ({size=20}) => {
    return (
      <img src={usdt} style={{height : `${size}px` , width : `${size}px`}} />
    )
  }
  export const IVC = ({size=20}) => {
    return (
      <img src={vector} style={{height : `${size}px` , width : `${size}px`}} />
    )
  }