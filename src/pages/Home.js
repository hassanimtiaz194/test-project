import React, { useEffect, useState } from "react";
import BasicTable from "../components/BasicTable";
import { Box, Typography } from "@mui/material";
import axios from "axios";

function Home() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    pagination: 10,
    search: null,
    order: "asc",
  });

  const fetchStudents = async () => {
    setLoading(true);
    try {
      // Construct the URL with query parameters
      const baseUrl = "https://freetestapi.com/api/v1/students";
      const params = new URLSearchParams({
        limit: searchParams.pagination,
        order: searchParams.order,
      });

      if (searchParams.search) {
        params.append("search", searchParams.search);
      }

      const response = await axios.get(`${baseUrl}?${params.toString()}`);
      setStudents(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSearchParams = (key, value) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [key]: value,
    }));
  };

  useEffect(() => {
    fetchStudents();
  }, [searchParams.pagination, searchParams.search, searchParams.order]);

  return (
    <Box sx={{ padding: "20px" }}>
      <BasicTable
        students={students}
        updateSearchParams={(key, value) => {
          updateSearchParams(key, value);
        }}
      />
      <Typography color="red" paddingTop="10px">
        Note: pagignation will not work as the public api is not paginated
      </Typography>
    </Box>
  );
}

export default Home;
