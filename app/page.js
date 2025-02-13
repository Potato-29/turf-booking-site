import QuickBook from "@/components/QuickBook/QuickBook";
//import {sports} from ".sports.jpg";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-between">
      <div className="w-full">
        <img
          src="/sports.jpg"
          className="w-full h-[calc(100vh-70px)] object-cover"
        />
      </div>
      <QuickBook />
    </main>
  );
}
