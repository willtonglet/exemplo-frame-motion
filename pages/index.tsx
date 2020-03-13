import * as React from "react";
import { useState, useRef, useLayoutEffect } from "react";
import { images } from "./images";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import Sidebar from "./sidebar";

const ParallaxImage = ({ src, ...style }) => {
  const [elementTop, setElementTop] = useState(0);
  const ref = useRef(null);
  const { scrollY } = useViewportScroll();

  const y = useTransform(scrollY, [elementTop, elementTop + 1], [0, -1], {
    clamp: false
  });

  useLayoutEffect(() => {
    const element = ref.current;
    setElementTop(element.offsetTop);
  }, [ref]);

  return (
    <div ref={ref} className="image-container">
      <motion.div className="overlay" style={{ ...style, y }} />
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <img src={src} alt="" />
      </motion.div>
    </div>
  );
};

const IndexPage = () => (
  <>
    <Sidebar />
    <div className="container">
      <h1>Teste Framer Motion</h1>
      {images.map(image => (
        <ParallaxImage key={image.src} {...image} />
      ))}
      <style jsx global>
        {`
          * {
            box-sizing: border-box;
          }

          body {
            overflow-x: hidden;
          }

          h1 {
            display: block;
            font-size: 17vw;
            font-family: Helvetica, sans-serif;
            text-transform: uppercase;
            font-weight: bolder;
            color: #09d436;
            position: fixed;
            top: -15vw;
            left: 50%;
            transform: translateX(-50%);
            line-height: 13vw;
            letter-spacing: -0.5rem;
          }

          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            perspective: 1200px;
            padding-top: 15vh;
            padding-bottom: 15vh;
          }

          .image-container {
            position: relative;
            margin-bottom: 50px;
            z-index: 1;
          }

          .overlay {
            top: 0;
            left: 0;
            width: 100px;
            height: 100px;
            position: absolute;
          }

          img {
            max-width: 100%;
            transform: translateZ(0);
          }

          nav {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 300px;
            z-index: 999;
          }

          .background {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 300px;
            background: #09d436;
          }

          button {
            outline: none;
            border: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            cursor: pointer;
            position: absolute;
            top: 18px;
            left: 15px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: transparent;
            color: #09d436;
          }

          button svg path {
            color: #fff;
            fill: #fff;
          }

          ul,
          li {
            margin: 0;
            padding: 0;
          }

          ul {
            padding: 25px;
            position: absolute;
            top: 100px;
            width: 230px;
          }

          li {
            list-style: none;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            cursor: pointer;
          }

          .icon-placeholder {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            flex: 40px 0;
            margin-right: 20px;
          }

          .text-placeholder {
            border-radius: 5px;
            width: 200px;
            height: 20px;
            flex: 1;
          }

          .refresh {
            padding: 10px;
            position: absolute;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 10px;
            width: 20px;
            height: 20px;
            top: 10px;
            right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  </>
);

export default IndexPage;
