import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCity, getCities } from "../../../../apis/admin/cities/CitiesApis";
import { setCities, setSelectedCity, removeCity } from "../../../../redux/reducers/citiesSlice";
import TablePage from "pages/Admin/components/TablePage";
import RightSidebar from "pages/Admin/components/Sidebar/RightSidebar";
import CitiesForm from "./components/CitiesForm";
import { debounce } from "lodash";
import { showSuccessSnackbar } from "utils/snackbarUtils";

const CitiesPage: React.FC = () => {
  const dispatch = useDispatch();
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isSelectedCity, setIsSelectedCity] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const cities = useSelector((state: any) => state.cities.cities);

  const fetchCities = useCallback(
    async (searchTerm: string, pageNumber: number, pageSize: number) => {
      setLoading(true); 
      try {
        const cities = await getCities("", searchTerm, 50, pageNumber);
        dispatch(setCities(cities));
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false); 
      }
    },
    [dispatch]
  );

  const fetchCitiesDebounced = useRef(
    debounce((searchTerm: string, pageNumber: number, pageSize: number) => {
      fetchCities(searchTerm, pageNumber, pageSize);
    }, 300)
  ).current;

  const handleSearch = (value: string) => {
    setSearchValue(value);
    fetchCitiesDebounced(value, 1, 10);
  };

  useEffect(() => {
    if (searchValue === "") {
      fetchCities("", 1, 10);
    } else {
      fetchCitiesDebounced(searchValue, 1, 10);
    }
  }, [searchValue, fetchCitiesDebounced]);

  const handleAddCity = () => {
    setIsSelectedCity(false);
    setRightSidebarOpen(true);
  };

  const handleEditCity = (city: any) => {
    dispatch(setSelectedCity(city));
    setRightSidebarOpen(true);
    setIsSelectedCity(true);
  };

  const handleDeleteCity = (cityId: any) => {
    dispatch(removeCity(cityId.id));
    try {
      deleteCity(cityId.id);
      showSuccessSnackbar("Item deleted", "The item has been successfully deleted.");
    } catch (error) {
      console.error("Error deleting city:", error);
    }
  };

  const columns = [
    { id: "id", label: "ID", width: 70 },
    { id: "name", label: "Name", width: 200 },
    { id: "description", label: "Description", width: 700 },
  ];

  return (
    <>
      <TablePage
        title="Cities"
        data={cities}
        onAddNewItem={handleAddCity}
        columns={columns}
        onEditItem={handleEditCity}
        onDeleteItem={handleDeleteCity}
        searchValue={searchValue}
        handleSearch={handleSearch}
        loading={loading} 
      />
      <RightSidebar open={rightSidebarOpen} onClick={() => setRightSidebarOpen(false)}>
        <CitiesForm
          onClose={() => {
            setRightSidebarOpen(false);
            setIsSelectedCity(false);
          }}
          isSelectedCity={isSelectedCity}
        />
      </RightSidebar>
    </>
  );
};

export default CitiesPage;
