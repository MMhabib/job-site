import { useState } from "react";
import { TextField, Button, MenuItem, Container, Typography, Box, Alert } from "@mui/material";

const jobCategories = [
  "Sales & Marketing",
  "Creative",
  "Human Resource",
  "Administration",
  "Digital Marketing",
  "Development",
  "Engineering",
];

const Createjob = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    category: "",
    description: "",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`, // Get token from cookie
        },
        body: JSON.stringify(job),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Job created successfully!");
        setJob({ title: "", company: "", category: "", description: "" }); // Clear form
      } else {
        throw new Error(data.message || "Failed to create job");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Create a New Job
        </Typography>

        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Job Title" name="title" value={job.title} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField fullWidth label="Company Name" name="company" value={job.company} onChange={handleChange} required sx={{ mb: 2 }} />
          <TextField
            select
            fullWidth
            label="Category"
            name="category"
            value={job.category}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          >
            {jobCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <TextField fullWidth multiline rows={4} label="Job Description" name="description" value={job.description} onChange={handleChange} required sx={{ mb: 2 }} />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Job
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Createjob;
