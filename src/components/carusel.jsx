import {Box,Card,Flex, CardHeader, CardBody, CardFooter, useStatStyles,Stack,Heading,Text,Divider,ButtonGroup,Button,Image } from '@chakra-ui/react'
import axios from 'axios'
import { useContext, useEffect, useState }from 'react'


export default function Carusel() {
  const slides = [
    {
      img: "https://c.static-nike.com/a/images/w_1920,c_limit/bzl2wmsfh7kgdkufrrjq/image.jpg",
    },
    {
      img: "data:image/png;base64,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",
    },
    {
      img: "https://mma.prnewswire.com/media/1892867/PUMA_Logo.jpg?p=facebook",
    },
    {
      img: "https://i.pinimg.com/originals/26/22/24/262224f1994378bc9cc9c839cfc10ea9.jpg",
    },
    {
      img: "https://1000logos.net/wp-content/uploads/2018/12/Fila-logo.jpg",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  const SLIDES_INTERVAL_TIME = 3000;
  const ANIMATION_DIRECTION = "right";
  useEffect(() => {
    const prevSlide = () => {
      setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };

    const nextSlide = () => {
      setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };

    const automatedSlide = setInterval(() => {
      ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
    }, SLIDES_INTERVAL_TIME);
    return () => clearInterval(automatedSlide);
  }, [slidesCount]);
  return (
    <Flex
      w={["100%",'50%']}
       bg={'whiteAlpha.50'}
     
      _dark={{
        bg: "#3e3e3e",
      }}
      p={10}
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="full" overflow="hidden">
        <Flex pos="relative" h="400px" w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} flex="none" boxSize="full" shadow="md">
              <Text
                color="white"
                fontSize="xs"
                p="8px 12px"
                pos="absolute"
                top="0"
                whiteSpace="nowrap"
              >
                {sid + 1} / {slidesCount}
              </Text>
              <Image
                src={slide.img}
                alt="carousel image"
                boxSize="full"
                backgroundSize="cover"
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};