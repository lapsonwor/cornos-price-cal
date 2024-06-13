'use client';
import Image from "next/image";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import DoneIcon from '@mui/icons-material/Done';
import { border, borderRadius, padding } from "@mui/system";
import { styled } from '@mui/material/styles';
import { useState, useEffect, useMemo } from "react";
import axios from 'axios';

export default function Home() {
  const [pageViewCat, setPageViewCat] = useState(1);
  const [billType, setBillType] = useState(1);
  const [croRate, setCroRate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json', {
          timeout: 500,
        });
        let croRateRes = res.data.usd.cro;
        setCroRate(croRateRes);
      } catch (error) {
        console.error(error);
      }
    };
  }, []);

  const pricePerMonth = useMemo(() => {
    let price = 8;
    switch (pageViewCat) {
      case 1:
        price = 8;
        if (billType === 1) {
          return price;
        } else {
          price = price * 0.75;
          return price;
        }
      case 2:
        price = 12;
        if (billType === 1) {
          return price;
        } else {
          price = price * 0.75;
          return price;
        }
      case 3:
        price = 16;
        if (billType === 1) {
          return price;
        } else {
          price = price * 0.75;
          return price;
        }
      case 4:
        price = 24;
        if (billType === 1) {
          return price;
        } else {
          price = price * 0.75;
          return price;
        }
      case 5:
        price = 36;
        if (billType === 1) {
          return price;
        } else {
          price = price * 0.75;
          return price;
        }
      default:
        price = 8;
        return price;
    }
  }, [pageViewCat, billType]);

  const pageViews = useMemo(() => {
    switch (pageViewCat) {
      case 1:
        return '10K';
      case 2:
        return '50K';
      case 3:
        return '100K';
      case 4:
        return '500K';
      case 5:
        return '1M';
      default:
        return '10K';
    }
  }, [pageViewCat, billType]);

  const croValue = useMemo(() => {
    return pricePerMonth * croRate;
  }, [pricePerMonth, croRate]);

  return (
    <main className="flex min-h-screen flex-col items-center text-[#8b909e] font-bold text-[15px] sm:px-6 sm:py-16 lg:px-24 lg:py-24" style={mainBg}>
      <div style={headerBg} className="py-10">
        <h1 className="text-[#29304d] text-center sm:text-[20px] lg:text-[36px]">Simple, traffic-based pricing</h1>
        <div className="mt-2 text-center">Sign-up for our 30-day trial.<br className="md:hidden" /> No credit card required.</div>
      </div>
      <div className="bg-white z-10 sm:mt-8 md:mt-16 pt-6 pb-5 flex flex-col rounded-xl shadow-md min-w-[55vw]">
        <div className="sm:mx-6 md:mx-10 flex justify-between items-center sm:flex-col md:flex-row">
          <div>{pageViews} PAGEVIEWS</div>
          <div className="sm:hidden md:block">
            <div className="flex items-center">
              <div className="text-[#29304d] text-[45px] mr-2">${pricePerMonth}.00</div>
              <div> / month</div>
            </div>
            <div className="text-right">or ~ {Math.ceil(croValue * 100) / 100} CRO / month</div>
          </div>
        </div>
        <div className="sm:mx-6 md:mx-10">
          <Slider sx={sliderColr} defaultValue={1} aria-labelledby="discrete-slider" valueLabelDisplay="auto" step={1} min={1} max={5} value={pageViewCat} onChange={(e, v) => setPageViewCat(v)} valueLabelFormat={value => `${pageViews} PAGEVIEWS`} />
        </div>
        <div className="sm:block md:hidden mx-[68px]">
          <div className="flex items-center justify-center">
            <div className="text-[#29304d] text-[38px] mr-2">${pricePerMonth}.00</div>
            <div> / month</div>
          </div>
          <div className="text-right">or ~ {Math.ceil(croValue * 100) / 100} CRO / month</div>
        </div>
        <div className="my-10 justify-end mr-10 flex items-center sm:mx-6 md:mx-10 sm:text-[11px] md:text-[15px]">
          <div>Monthly Biling</div>
          <Switch sx={switchStyle} checked={billType === 2}
            onChange={() => setBillType(billType === 1 ? 2 : 1)} />
          <div>Yearly Biling</div>
          <div className="text-[#eaab97] px-2 py-1 bg-[#faeee9] rounded-full ml-2 md:hidden">-25%</div>
          <div className="text-[#eaab97] px-2 py-1 bg-[#faeee9] rounded-full ml-2 sm:hidden md:block">25% discount</div>
        </div>
        <hr />
        <div className="sm:my-4 md:my-8 sm:mx-6 md:mx-10 flex items-center justify-between sm:flex-col md:flex-row">
          <div className="">
            <div className="flex mb-2 sm:justify-center md:justify-start"><DoneIcon sx={{ color: "#63d5c5" }} /><div className="ml-4">Unlimited websites</div></div>
            <div className="flex mb-2 sm:justify-center md:justify-start"><DoneIcon sx={{ color: "#63d5c5" }} /><div className="ml-4">100% data ownership</div></div>
            <div className="flex sm:justify-center md:justify-start"><DoneIcon sx={{ color: "#63d5c5" }} /><div className="ml-4">Email reports</div></div>
          </div>
          <div role="button" className="bg-[#2a3352] text-white rounded-full px-12 py-4 sm:mt-8">
            Start my trial
          </div>
        </div>
      </div>
    </main>
  );
}

const sliderColr = {
  color: '#b3f0e9',
  '& .MuiSlider-thumb': {
    width: 30,
    height: 30,
    backgroundColor: '#63d5c5',
    backgroundImage: 'url("./images/icon-slider.svg")',
    backgroundPosition: '50% 50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '70%',
    boxShadow: 'none',
    '&:active': {
      backgroundColor: '#53aaa1',
      boxShadow: 'none',
    },
    '&:hover': {
      backgroundColor: '#53aaa1',
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: 'none',
    },
  },
  '& .MuiSlider-track': {
    backgroundColor: '#b3f0e9',
  },
  '& .MuiSlider-rail': {
    backgroundColor: 'grey',
  }
}

const mainBg = {
  backgroundImage: 'url("./images/bg-pattern.svg")',
  backgroundRepeat: 'no-repeat',
}

const headerBg = {
  backgroundImage: 'url("./images/pattern-circles.svg")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '50% 50%',
  backgroundRepeat: 'no-repeat',
  backgroubnSize: 'contain',
}

const switchStyle = {
  width: '80px',
  paddingTop: '8px',
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#63d5c5',
    transform: 'translateX(32px)',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#63d5c5',
  },
  '& .MuiSwitch-track': {
    height: '24px',
    width: '80px',
    borderRadius: '12px',
  },
  '& .MuiSwitch-thumb': {
    color: '#fff',
    width: '20px',
    height: '20px',
    transform: 'translateY(1px) translateX(5px)',
  },
}