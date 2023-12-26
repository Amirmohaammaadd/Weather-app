import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsThermometer,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import { useEffect, useState } from "react";
import axios from "axios";

const APIkey = "b8424f8ef690615e1cee43846ecb2e09";
function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Tehran");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(inputValue);
    e.preventDefault();
    if (inputValue !== "") {
      setLocation(inputValue);
    }
  };

  // fetch data

  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  // error msg
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMsg]);

  //loading if data was not ok
  if (!data) {
    return (
      <div
        className="w-full h-screen bg-gradient-to-r from-purple-500 to-pink-500 bg-center bg-cover
      flex flex-col items-center justify-center px-4 lg:px-0"
      >
        <div >
          <ImSpinner8 className="text-5xl animate-spin text-white" />
        </div>
      </div>
    );
  }
  let icon;
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]"/>;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Snow":
      icon = <IoMdSnow />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;

    default:
      break;
  }

  const date = new Date();
  return (
    <div
      className="w-full h-screen bg-gradient-to-r from-purple-500 to-pink-500 bg-center bg-cover
    flex flex-col items-center justify-center px-4 lg:px-0"
    >

      {errorMsg && <div className="w-full max-w-[400px] text-white p-5 mb-4 rounded-lg capitalize bg-[#ff208c]">{`${errorMsg.response.data.message}`} !</div>}
      {/* from */}
      <form
        onChange={(e) => handleInput(e)}
        className="text-white h-16 w-full max-w-[450px] bg-black/20 rounded-full mb-8 shadow-xl"
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            className="flex-1 bg-transparent outline-none placeholder:text-white
          text-[17px] "
            type="text"
            placeholder="Search by city"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="text-white text-4xl hover:scale-125 ;
            "
          >
            <IoMdSearch />
          </button>
        </div>
      </form>

      {/* card */}
      <div
        className="w-full max-w-[450px] min-h-[550px] text-white backdrop-blur-[32px] 
      rounded-[32px] py-12 px-6 bg-black/20 shadow-2xl"
      >
        {loading ? (
          <div className="text-2xl w-full h-full flex justify-center items-center">
            loading
            <ImSpinner8 className="ml-2 animate-spin" />
          </div>
        ) : (
          <div className="">
            {/* card top */}
            <div className="flex item-center gap-x-5">
              <div className="text-[88px]">{icon}</div>
              <div className="mt-4">
                <div className="text-2xl font-semibold">
                  {data.name}, {data.sys.country}
                </div>
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>
            {/* card body */}
            <div className="my-20">
              <div className="flex justify-center items-center">
                <div className="text-[144px] leading-none font-light">
                  {parseInt(data.main.temp)}
                </div>
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>
              <div className="text-center capitalize">
                {data.weather[0].description}
              </div>
            </div>
            {/* card bottom */}
            <div className="max-w-[400px] mx-auto flex flex-col gap-y-6">
              <div className="flex justify-between">
                {/* visiv\bility */}
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility
                    <span className="ml-2">{data.visibility / 1000}km</span>
                  </div>
                </div>

                {/* visiv\bility */}
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels like
                    <div className="flex ml-2">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
