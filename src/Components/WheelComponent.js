import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import CircularProgress from "@mui/material/CircularProgress";

function WheelComponent({ data }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [ytLink, setYtLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setYtLink("");
    setWebsiteLink("");
  };

  const filterArray = data.filter((ulam) => {
    return ulam.option.includes("pork") || ulam.option.includes("baboy");
  });

  return (
    <>
      <div className="wheel-holder">
        <div className="wheel">
          <Wheel
            backgroundColors={[
              "#E0BBE4",
              "#FFDFD3",
              "#FFDFD3",
              "#F7F3D6",
              "#869EDC",
              "#F47C7C",
              "#F7F48B",
              "#A1DE93",
            ]}
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            fontSize="12"
            radiusLineWidth="2"
            onStopSpinning={() => {
              console.log(prizeNumber);
              setYtLink(data[prizeNumber].yt);
              setWebsiteLink(data[prizeNumber].website);
              setMustSpin(false);
            }}
          />
          <button className="btn-grad" onClick={handleSpinClick}>
            SPIN
          </button>
        </div>
      </div>

      <div className="embeded-data">
        {ytLink == "" && mustSpin ? (
          <CircularProgress color="secondary" />
        ) : (
          <>
            {" "}
            <div className="yt">
              <iframe
                src={ytLink}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              ></iframe>
            </div>
            <div className="website mt-5">
              <iframe
                id="inlineFrameExample"
                title="Inline Frame Example"
                src={websiteLink}
              ></iframe>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default WheelComponent;
