import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views-react-18-fix";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "Banner 1",
    imgPath: "/assets/banners/banner-1.jpg",
  },
  {
    label: "Banner 2",
    imgPath: "/assets/banners/banner-2.jpg",
  },
  {
    label: "Banner 3",
    imgPath: "/assets/banners/banner-3.jpg",
  },
  {
    label: "Banner 4",
    imgPath: "/assets/banners/banner-4.jpg",
  },
];

function Carousel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);


  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box className='w-full'>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component='img'
                sx={{
                  height: 350,
                  display: "block",
                //   maxWidth: 400,
                  overflow: "hidden",
                  objectFit: "cover",
                  width: "100%",
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </Box>
  );
}

export default Carousel;
