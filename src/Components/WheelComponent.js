import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import CircularProgress from "@mui/material/CircularProgress";
import Sound from "react-sound";
import Swal from "sweetalert2";
import paimon from "../paimon.gif";
import paimon2 from "../paimonAngry.gif";
import wheelSound from "../wheel.mp3";
import paimonmp3 from "../paimon.mp3";
import emergencyFood from "../emergencyfood.mp3";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

function WheelComponent({ data }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [startLoad, setStartLoad] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [ytLink, setYtLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setYtLink("");
    setWebsiteLink("");
    setDoneLoading(false);
    setStartLoad(true);
    wheelSoundEffect.play();
  };

  // const filterArray = data.filter((ulam) => {
  //   return ulam.option.includes("pork") || ulam.option.includes("baboy");
  // });

  const wheelSoundEffect = new Audio(wheelSound);
  const paimonSound = new Audio(paimonmp3);
  const emergencyFoodSound = new Audio(emergencyFood);

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
            fontSize="13"
            style={{ fontWeight: "1500" }}
            radiusLineWidth="2"
            onStopSpinning={() => {
              setYtLink(data[prizeNumber].yt);
              setWebsiteLink(data[prizeNumber].website);
              setStartLoad(false);
              setMustSpin(false);

              if (data[prizeNumber].option != "Paimon") {
                Swal.fire({
                  title: `Your ulam for today is ` + data[prizeNumber].option,
                  width: 400,
                  backdrop: `
                    rgba(0,0,123,0.4)
                    url(${paimon})
                    top right
                    no-repeat
                  `,
                });
                setTimeout(() => {
                  paimonSound.play();
                }, 1000);
              } else {
                Swal.fire({
                  title: `Your ulam for today is Paimon the Emergency Food!! Dig in!`,
                  width: 400,
                  backdrop: `
                    rgba(0,0,123,0.4)
                    url(${paimon2})
                    top right
                    no-repeat
                  `,
                });
                setTimeout(() => {
                  emergencyFoodSound.play();
                }, 1000);
              }

              const timer = setTimeout(() => {
                setDoneLoading(false);
              }, 2000);
              return () => clearTimeout(timer);
            }}
          />
          <button className="btn-grad" onClick={handleSpinClick}>
            SPIN
          </button>
        </div>
      </div>

      <div className="embeded-data">
        {ytLink == "" && doneLoading == false && startLoad ? (
          <CircularProgress color="secondary" />
        ) : (
          <>
            {" "}
            <div className="social-media-btn my-4">
              <FacebookShareButton
                // onClick={hello}
                url="https://ulamfortoday.netlify.app/"
                quote="sample"
                hashtag="#ulamfortoday.netlify.app"
              >
                <FacebookIcon className="mx-2" size={50} round={true} />
              </FacebookShareButton>
              <FacebookMessengerShareButton
                // onClick={hello}
                url="https://ulamfortoday.netlify.app/"
                quote="sample"
              >
                <FacebookMessengerIcon
                  className="ml-2"
                  size={50}
                  round={true}
                />
              </FacebookMessengerShareButton>
              <LinkedinShareButton
                // onClick={hello}
                url="https://ulamfortoday.netlify.app/"
                quote="sample"
              >
                <LinkedinIcon className="mx-2" size={50} round={true} />
              </LinkedinShareButton>
              <TwitterShareButton
                // onClick={hello}
                url="https://ulamfortoday.netlify.app/"
                quote="sample"
              >
                <TwitterIcon size={50} round={true} />
              </TwitterShareButton>
              <p>Share your result with your friends</p>
            </div>
            <div className="yt">
              <iframe
                src={ytLink}
                title="YouTube video player"
                frameBorder="0"
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
