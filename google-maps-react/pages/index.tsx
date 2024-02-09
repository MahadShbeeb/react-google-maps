import { useLoadScript } from "@react-google-maps/api";
import Map from "../components/map";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBQflAXOHQc2A92df5sOFTyYxiQb1SB9l8",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}
