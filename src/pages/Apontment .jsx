import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Apontment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const daysOfweek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docInfo, setDocInfo] = useState(null);
  const [docslots, setDocslots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };
  const getAvailableSlots = async () => {
    setDocslots([]);
    //getting current  date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // geting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDay() + i);

      // seeting ending time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      // seeting ours

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        // add slote to array

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        //increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocslots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docslots);
  }, [docslots]);

  return (
    docInfo && (
      <div>
        {/*doctors details  */}

        <div className="flex  flex-cols sm:flex-row gap-4 ">
          <div>
            <img
              className=" bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          {/* doc info like name ,degree , exprence  */}

          <div
            className="flex-1 border border-gray-600 rounded-lg p-8 py-7 bg-white mx-2
            sm:mx-0 -mt-20 sm:mt-0"
          >
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-900">
              <p>
                {docInfo.degree}-{docInfo.speciality}{" "}
              </p>
              <button className=" py-0.5 px-2 border text-xs rounded-full ">
                {docInfo.experience}
              </button>
            </div>
            {/* doctors about  */}
            <div>
              <p className="flex items-center gap-3 font-medium mt-3 text-gray-900">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4 ">
              Appointment fee:{" "}
              <span className="text-gray-600"> ${docInfo.fees}</span>{" "}
            </p>
          </div>
        </div>
        {/* Booking slots  */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>

          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4 ">
            {docslots.length &&
              docslots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex == index
                      ? "bg-primary text-white "
                      : "border border-gray-600"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfweek[item[0].datetime.getDay()]}</p>

                  <p>{item[0] && item[0].datetime.getDate()} </p>
                </div>
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docslots.length > 0 &&
              docslots[slotIndex] &&
              docslots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-600"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          <div>
            <button className=" bg-primary rounded-full  hover:shadow-xl transition-all duration-300  transform hover:scale-105  mt-10 font-semibold text-white py-5 px-8 ">
              {" "}
              Book an appointment
            </button>
          </div>
        </div>
          
          {/*  relatet doctor component  */}
          <RelatedDoctors docId={ docId}  speciality = {docInfo.speciality}></RelatedDoctors>

      </div>
    )
  );
};

export default Apontment;