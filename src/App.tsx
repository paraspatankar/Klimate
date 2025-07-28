import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import { Button } from "./components/ui/button";
import Layout from "./components/Layout";
import { ThemeProvider } from "./context/themeprovider";
import WeatherDashboard from "./pages/WeatherDashboard";
import CityPage from "./pages/CityPage";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 5 * 60 * 1000, //5 minutes
      gcTime: 10 * 60 * 1000, //10 minutes
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          
          <Routes>
            <Route path='/' element={<WeatherDashboard/>} />
            <Route path='/city/:cityName' element={<CityPage/>} />
           
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
