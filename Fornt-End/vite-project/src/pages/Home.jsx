import React from 'react'
import CaategoryList from '../components/CaategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizetalCardProduct from '../components/HorizetalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

function Home() {
  return (
    <div>
      <CaategoryList/>
      <BannerProduct/>
      <HorizetalCardProduct category={"airpodes"} heading={"Top's Airpods"}/>
      <HorizetalCardProduct category={"watches"} heading={"Popular's Watches"}/>


      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
      <VerticalCardProduct category={"mouse"} heading={"Mouse"}/>
      <VerticalCardProduct category={"camera"} heading={"Camera"}/>
      <VerticalCardProduct category={"earphones"} heading={"Wireless Earphones"}/>
      <VerticalCardProduct category={"printers"} heading={"Printers & Scanners"}/>
      <VerticalCardProduct category={"processors"} heading={"Processors"}/>
      <VerticalCardProduct category={"refrigerators"} heading={"Refrigerators & Freezers"}/>
      <VerticalCardProduct category={"speakers"} heading={"Speakers & Home Audio"}/>
      <VerticalCardProduct category={"television"} heading={"Televisions & Smart TVs"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Hair Trimmers & Shavers"}/>

    </div>
  )
}

export default Home