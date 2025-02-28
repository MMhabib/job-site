import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, Accordion, AccordionSummary, AccordionDetails, Box, Paper, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BusinessIcon from "@mui/icons-material/Business";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const jobCategories = [
    "Sales & Marketing",
    "Creative",
    "Human Resource",
    "Administration",
    "Digital Marketing",
    "Development",
    "Engineering",
  ];

  return (
    <Box sx={{ bgcolor: "grey.100", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ bgcolor: "primary.dark", borderRadius: "0 0 16px 16px" }}>
        <Toolbar>
          <BusinessIcon sx={{ fontSize: 40, mr: 2 }} />
          <Box>
            <Typography variant="h6" fontWeight="bold">TechForing</Typography>
            <Typography variant="body2">Shaping Tomorrows Cybersecurity</Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, maxWidth: 600 }}>
        <Typography variant="h4" align="center" fontWeight="bold">BROWSE OPEN POSITIONS BY CATEGORY</Typography>
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          We are always on the lookout for talented people
        </Typography>

        <Box>
          {jobCategories.map((category, index) => (
            <Paper key={index} elevation={3} sx={{ mb: 1, borderRadius: 2, overflow: "hidden" }}>
              <Accordion sx={{ minHeight: 60, bgcolor: "grey.200" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6" fontWeight="bold" color="grey.700">{category}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {jobs.filter((job) => job.category === category).length > 0 ? (
                    jobs.filter((job) => job.category === category).map((job) => (
                      <Box key={job._id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                        <Typography color="text.secondary">{job.title} - {job.company}</Typography>
                        <Button size="small" variant="outlined" onClick={() => navigate(`/jobs/${job._id}`)}>View Details</Button>
                      </Box>
                    ))
                  ) : (
                    <Typography color="text.secondary">No jobs available in {category}.</Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
