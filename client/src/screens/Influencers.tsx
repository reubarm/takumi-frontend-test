import { useEffect, useState, useContext } from "react";
import {
  Avatar,
  Card,
  Container,
  Grid,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { fetchData } from "../services/api/";
import DataList from "../components/DataList";
import DataView from "../components/DataView";
import SelectContext from "../hooks/SelectContext";

const Influencers: React.FC = () => {
  const [influencers, setInfluencers] = useState<Brand[]>([]);
  const { selected, setSelected } = useContext(SelectContext);

  const type = "Influencers";

  useEffect(() => {
    (async () => {
      const data = await fetchData(type);
      if (data) {
        setInfluencers(data);
      }
      setSelected({});
    })();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ my: 5 }}>
      <Typography variant="h2" component="h1" color="initial">
        {type}
      </Typography>
      <Grid container spacing={10}>
        <Grid item xs={12} md={5}>
          <DataList type={type} data={influencers} />
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid container>
            <DataView type={type} selected={selected} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Influencers;
