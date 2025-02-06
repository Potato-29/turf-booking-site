"use client";
import { getTurfById } from "@/services/turf-services";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, DatePicker, Select } from "antd";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";

export default function BookingPage() {
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

  // if possible make these durations incremental and user configurable, like the turf admin can select the duration be in 1h gaps or 30mins
  const durations = [];

  const options = [
    { value: "jack", label: "Jack" },
    { value: "lucy", label: "Lucy" },
    { value: "Yiminghe", label: "yiminghe" },
    { value: "disabled", label: "Disabled", disabled: true },
  ];
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

  console.log(turf);
  return (
    <div className="w-full h-full flex justify-center items-center p-40">
      <div className="w-full h-full rounded-md border-2 border-gray-300 mr-2 p-2">
        <div className="p-2">
          <h1 className="font-semibold text-2xl">{turf?.name || ""}</h1>
          <h3 className="">{turf?.address || ""}</h3>
        </div>
        <hr className="text-success bg-success h-1 rounded-md" />
        <div className="">
          <div className=" flex justify-between items-center p-2">
            <Label className="w-2/4">Sports</Label>
            <Select
              className="w-2/4 h-12"
              defaultValue="lucy"
              onChange={(e) => console.log("event", e)}
              options={options}
            />
          </div>

          <div className=" flex justify-between items-center p-2">
            <Label className="w-2/4">Date</Label>
            <DatePicker
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
                <Button shape="circle" className="bg-blue-500 text-white">
                  -
                </Button>
              </div>
              <div className="w-full text-center">test</div>
              <div className="w-full flex justify-end">
                <Button shape="circle" className="bg-blue-500 text-white">
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full border-2 border-gray-300 rounded-md ml-2 p-2">
        test
      </div>
    </div>
  );
}
