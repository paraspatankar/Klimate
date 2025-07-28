import CurrentWeather from "@/components/current-weather";
import HourlyTemperature from "@/components/HourlyTemp";
import WeatherSkeleton from "@/components/loadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/weather-details";
import { WeatherForecast } from "@/components/WeatherForecast";
import { useGeolocation } from "@/hooks/use-geolocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { MapPin, RefreshCw, Terminal } from "lucide-react";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLading,
  } = useGeolocation();

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecasstQuery = useForecastQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecasstQuery.refetch();
      locationQuery.refetch();
      //reload weather data
    }
  };

  if (locationLading) {
    return <WeatherSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <Terminal />
        <AlertTitle>Location ERROR</AlertTitle>
        <AlertDescription className="flex flex-col gap-5">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4"></MapPin>
            <i>Enable Location</i>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <Terminal />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-5">
          <p>Please enable location access to see your local weather</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4"></MapPin>
            <i>Enable Location</i>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecasstQuery.error) {
    return (
      <Alert variant="destructive">
        <Terminal />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-5">
          <p>failed to fetch weather data. Please try again</p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4"></MapPin>
            <i>Retry</i>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecasstQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/*Favourite Cities*/}
      <div className="flex items-center justify-between">
        <h1 className="text-x1 font-bold tracking-tight">My Location</h1>
        <Button
          onClick={handleRefresh}
          variant={"outline"}
          size={"icon"}
          disabled={weatherQuery.isFetching || forecasstQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Current Weather*/}
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />

          {/* hourly temperature*/}
          <HourlyTemperature data={forecasstQuery.data} />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 w-full">
          {/* details */}
          <WeatherDetails data={weatherQuery.data}/>
          {/* forecast */}
          <WeatherForecast data={forecasstQuery.data} />
        </div>
      </div>

      {/* Current & Hourly Weather */}
    </div>
  );
};

export default WeatherDashboard;
