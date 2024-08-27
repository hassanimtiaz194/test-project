import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  Grid,
} from "@mui/material";

const StudentModal = ({ open, onClose, student }) => {
  if (!student) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle textAlign="center" fontWeight="900" fontSize="26px">
        Student Details
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: { xs: "20px", sm: "50px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: { xs: "100%", sm: "40%" },
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Avatar
              alt={student.name}
              src={student.image}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h6" fontWeight="700">
              {student.name}
            </Typography>
          </Box>
          <Grid container spacing={2} paddingTop="20px">
            <Grid item xs={6} sm={3}>
              <Box fontWeight="fontWeightBold">Age:</Box>
            </Grid>
            <Grid item xs={6} sm={9}>
              <Box>{student.age}</Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box fontWeight="fontWeightBold">Gender:</Box>
            </Grid>
            <Grid item xs={6} sm={9}>
              <Box>{student.gender}</Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box fontWeight="fontWeightBold">Email:</Box>
            </Grid>
            <Grid item xs={6} sm={9}>
              <Box sx={{ wordBreak: "break-all" }}>{student.email}</Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box fontWeight="fontWeightBold">Phone:</Box>
            </Grid>
            <Grid item xs={6} sm={9}>
              <Box>{student.phone}</Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box fontWeight="fontWeightBold">Address:</Box>
            </Grid>
            <Grid item xs={6} sm={9}>
              <Box>
                {student.address.street}, {student.address.city},{" "}
                {student.address.zip}, {student.address.country}
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box fontWeight="fontWeightBold">GPA:</Box>
            </Grid>
            <Grid item xs={6} sm={9}>
              <Box>{student.gpa}</Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box fontWeight="fontWeightBold">Courses:</Box>
            </Grid>
            <Grid item xs={6} sm={9}>
              <Box>{student.courses.join(", ")}</Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Button onClick={onClose} color="error" variant="outlined">
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default StudentModal;
