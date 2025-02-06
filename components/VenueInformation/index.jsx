"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, DollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTurfById } from "@/services/turf-services";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function VenueInformationComponent({ params }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [turf, setTurf] = useState(null);

  const getTurfInfo = async () => {
    const res = await getTurfById(params.id);
    if (res.length > 0) {
      setTurf(res[0]);
    }
  };

  const router = useRouter();

  console.log("turf", turf);
  useEffect(() => {
    getTurfInfo();
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{turf?.name}</h1>
          <div className="flex items-center mb-4">
            <MapPin className="mr-2" />
            <span>{turf?.address}</span>
          </div>
          <Carousel className="w-full max-w-2xl mx-auto">
            <CarouselContent>
              {turf?.images?.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Image
                      src={image}
                      alt={`Venue image ${index + 1}`}
                      width={800}
                      height={400}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <Tabs defaultValue="info" className="w-full my-5">
            <TabsList>
              <TabsTrigger value="info">Information</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Available Sports
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {turf?.available_sports?.map((sport) => (
                      <Badge key={sport} variant="secondary">
                        {sport}
                      </Badge>
                    ))}
                  </div>

                  <h2 className="text-xl font-semibold mb-4">
                    Operating Hours
                  </h2>
                  <div className="flex items-center mb-2">
                    <Clock className="mr-2" />
                    <span>Weekdays: {turf?.hours?.weekdays}</span>
                  </div>
                  <div className="flex items-center mb-6">
                    <Clock className="mr-2" />
                    <span>Weekends: {turf?.hours?.weekends}</span>
                  </div>

                  <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                  <ul className="list-disc list-inside mb-6">
                    {turf?.amenities?.map((amenity) => (
                      <li key={amenity}>{amenity}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Customer Reviews
                  </h2>
                  {turf?.reviews?.map((review, index) => (
                    <div
                      key={index}
                      className="mb-4 pb-4 border-b last:border-b-0"
                    >
                      <div className="flex items-center mb-2">
                        <Star className="text-yellow-400 mr-1" />
                        <span className="font-semibold">{review.rating}</span>
                        <span className="ml-2">{review.author}</span>
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:relative">
          <div className="md:fixed md:w-[calc(33.333%-2rem)]">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Book this Venue</h2>
                <div className="flex items-center mb-4">
                  <DollarSign className="mr-2" />
                  <span className="text-lg">
                    From ${turf?.price?.hourly}/hour
                  </span>
                </div>
                <div className="mb-4">
                  <Calendar className="mb-2" />
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={() => router.push(`/booking?turf_id=${params.id}`)}
                  variant="success"
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
