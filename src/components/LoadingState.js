import Loader from "../../src/assets/loader1.gif";

export default function LoadingState() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center">
      <img className="w-52 h-52" src={Loader} alt="Loading Icon" />
      <p className="text-center font-bold text-xl">Fetching Data</p>
    </div>
  );
}
