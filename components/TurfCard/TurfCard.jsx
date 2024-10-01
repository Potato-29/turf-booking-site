import React from "react";
import { IoMdFootball, IoMdTennisball } from "react-icons/io";
import { MdSportsCricket } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const TurfCard = ({ turf }) => {
  const renderIcon = (sport) => {
    switch (sport) {
      case "football":
        return (
          <IoMdFootball className="mr-2 border border-gray-400 transition duration-300 hover:bg-slate-200 rounded-full hover:scale-110 p-1 lg:p-2 text-4xl lg:text-5xl" />
        );
      case "cricket":
        return (
          <MdSportsCricket className="mr-2 border border-gray-400 transition duration-300 hover:bg-slate-200 rounded-full hover:scale-110 p-1 lg:p-2 text-4xl lg:text-5xl" />
        );
      case "tennis":
        return (
          <IoMdTennisball className="mr-2 border border-gray-400 transition duration-300 hover:bg-slate-200 rounded-full hover:scale-110 p-1 lg:p-2 text-4xl lg:text-5xl" />
        );
      default:
        return null;
    }
  };
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/venue/${turf.id}`)}
      className="min-h-[350px] flex flex-col my-5 border rounded-xl transition duration-300 hover:shadow-md cursor-pointer mx-1 lg:mx-5"
    >
      <div>
        <img
          src={turf?.header_image}
          className="rounded-t-md w-full object-cover"
          alt="turf-image"
        />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="p-4">
          <p className="font-semibold">{turf?.name}</p>
          <p className="">{turf?.address}</p>
        </div>
        <div className="flex px-4 py-3 justify-between items-center">
          <div className="flex flex-row w-full">
            {turf?.available_sports.map((sport) => renderIcon(sport))}
            {/* <IoMdFootball className="mr-2 border border-gray-400 transition duration-300 hover:bg-slate-200 rounded-full hover:scale-110 p-1 lg:p-2 text-4xl lg:text-5xl" />
            <MdSportsCricket className="mx-2 border border-gray-400 transition duration-300 hover:bg-slate-200 rounded-full hover:scale-110 p-1 lg:p-2 text-4xl lg:text-5xl" />
            <IoMdTennisball className="mx-2 border border-gray-400 transition duration-300 hover:bg-slate-200 rounded-full hover:scale-110 p-1 lg:p-2 text-4xl lg:text-5xl" /> */}
          </div>
          <div className="flex">
            <FaArrowRight
              color="white"
              className="border bg-blue-500 cursor-pointer transition duration-300 hover:shadow-md hover:bg-blue-700 
            rounded-full p-2 hover:scale-110"
              size={"3em"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurfCard;
