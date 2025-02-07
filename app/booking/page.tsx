"use client";
import { getTurfById } from "@/services/turf-services";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, DatePicker, Select } from "antd";
import { Label } from "@/components/ui/label";
import {
  Clock,
  Minus,
  Plus,
  LandPlot,
  Calendar,
  ArrowDownNarrowWide,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";
import { useStore } from "@/store/store";

// if possible make these durations incremental and user configurable, like the turf admin can select the duration be in 1h gaps or 30mins
const durations = [
  { value: "60", label: "1h" },
  { value: "90", label: "1h 30m" },
  { value: "120", label: "2h" },
  { value: "150", label: "2h 30m" },
  { value: "180", label: "3h" },
  { value: "210", label: "3h 30m" },
  { value: "240", label: "4h" },
  { value: "270", label: "4h 30m" },
  { value: "300", label: "5h" },
];

const courts = [
  { value: "1", label: "Turf 1" },
  { value: "2", label: "Turf 2" },
];

const options = [
  { value: "jack", label: "Jack" },
  { value: "lucy", label: "Lucy" },
  { value: "Yiminghe", label: "yiminghe" },
  { value: "disabled", label: "Disabled", disabled: true },
];

const timeSlots = [
  { value: "9:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "17:00", label: "5:00 PM" },
];

export default function BookingPage() {
  const [selectedDuration, setSelectedDuration] = useState<{
    value: string;
    label: string;
  }>(durations[0]);
  const [disableDurationIncrease, setDisableDurationIncrease] = useState(false);
  const [disableDurationDecrease, setDisableDurationDecrease] = useState(true);
  const [durationIndex, setDurationIndex] = useState(0);
  const { count, inc } = useStore();

  console.log(count, "zustand");

  const searchParams = useSearchParams();
  const turfId = searchParams.get("turf_id");
  const [turf, setTurf] = useState(undefined);

  const getTurfInfo = async () => {
    const res = await getTurfById(turfId);
    if (res.length > 0) {
      setTurf(res[0]);
    }
  };

  useEffect(() => {
    if (turfId) {
      getTurfInfo();
    }
  }, []);

  const handleDuration = (action: "increase" | "decrease") => {
    setDurationIndex((prevIndex) => {
      let newIndex = prevIndex;
      if (action === "increase" && prevIndex < durations.length - 1) {
        newIndex += 1;
      } else if (action === "decrease" && prevIndex > 0) {
        newIndex -= 1;
      }
      setSelectedDuration(durations[newIndex]);
      setDisableDurationIncrease(newIndex === durations.length - 1);
      setDisableDurationDecrease(newIndex === 0);
      return newIndex;
    });
  };

  return (
    <div className="w-full h-full flex items-center px-28">
      <div className="flex flex-row w-full">
        {/* Booking Info container */}
        <div className="w-full rounded-md border-2 border-gray-300 mr-2 p-2">
          <div className="p-2">
            <h1 className="font-semibold text-2xl">{turf?.name || ""}</h1>
            <h3 className="">{turf?.address || ""}</h3>
          </div>
          <hr className="text-success bg-success h-1 rounded-md" />
          <div className="">
            <div className=" flex justify-between items-center p-2">
              <Label className="w-2/4">Sports</Label>
              <Select
                suffixIcon={<ChevronDown />}
                className="w-2/4 h-12"
                defaultValue="lucy"
                onChange={(e) => console.log("event", e, inc())}
                options={options}
              />
            </div>

            <div className=" flex justify-between items-center p-2">
              <Label className="w-2/4">Date</Label>
              <DatePicker
                suffixIcon={<Calendar />}
                className="h-12 w-2/4"
                onChange={(_, date) => console.log("value", date)}
              />
            </div>

            <div className="flex justify-between items-center p-2">
              <Label className="w-2/4">Time Slots</Label>
              <Select
                suffixIcon={<Clock />}
                className="w-2/4 h-12"
                defaultValue="9:00"
                onChange={(e) => console.log("event", e)}
                dropdownRender={(menu) => {
                  return <div className="rounded-md p-2">{menu}</div>;
                }}
                optionRender={(option) => (
                  <div className="h-10 flex items-center justify-center rounded-md border-2 border-success ">
                    {option.label}
                  </div>
                )}
                options={timeSlots}
              />
            </div>

            <div className="flex justify-between items-center p-2">
              <Label className="w-2/4">Duration</Label>
              <div className="flex flex-row items-center justify-center w-2/4">
                <div className="w-full flex justify-start">
                  <Button
                    onClick={() => handleDuration("decrease")}
                    disabled={disableDurationDecrease}
                    shape="circle"
                    className="bg-blue-500 text-white flex justify-center items-center"
                  >
                    <Minus size={20} />
                  </Button>
                </div>
                <div className="w-full text-center font-bold">
                  {selectedDuration.label}
                </div>
                <div className="w-full flex justify-end">
                  <Button
                    onClick={() => handleDuration("increase")}
                    disabled={disableDurationIncrease}
                    shape="circle"
                    className="bg-blue-500 text-white flex justify-center items-center"
                  >
                    <Plus size={20} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-2">
              <Label className="w-2/4">Court</Label>
              <Select
                suffixIcon={<LandPlot />}
                className="w-2/4 h-12"
                defaultValue={courts[0].label}
                onChange={(e) => console.log("event", e)}
                dropdownRender={(menu) => {
                  return <div className="rounded-md p-2">{menu}</div>;
                }}
                optionRender={(option) => (
                  <div className="h-10 flex items-center justify-center rounded-md border-2 border-success ">
                    {option.label}
                  </div>
                )}
                options={courts}
              />
            </div>
          </div>
        </div>
        {/* Card container */}
        <div className="w-full border-2 border-gray-300 rounded-md ml-2 p-2">
          <div className="p-2 text-right">
            <h1 className="font-semibold text-2xl">Your Cart</h1>
            <h3 className=""> &nbsp;</h3>
          </div>
          <hr className="text-success bg-success h-1 rounded-md" />
          <div className="flex justify-center items-center h-full w-full py-20">
            <div className="flex flex-col items-center justify-center mb-24">
              <ShoppingCart size={55} />
              <p> Cart is empty </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
