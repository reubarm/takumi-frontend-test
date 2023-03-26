import { useState, useEffect } from "react";

import { Box, Container, Toolbar } from "@mui/material";

import NavigationBar, {
  SECTION_BRANDS,
  SECTION_INFLUENCERS,
  SECTION_CAMPAIGNS,
} from "./layout/NavigationBar";

import Brands from "./screens/Brands";
import Influencers from "./screens/Influencers";
import Campaigns from "./screens/Campaigns";

import SelectContext from "./hooks/SelectContext";

function App() {
  const [sectionTitle, setSectionTitle] = useState(SECTION_BRANDS);

  const handleNavChange = (value: string) => setSectionTitle(value);

  const [selected, setSelected] = useState<any[]>([]);

  useEffect(() => {
    setSelected(selected);
  }, []);


  return (
    <>
      <NavigationBar title={sectionTitle} onChange={handleNavChange} />
      <Box component="main" sx={{ py: 1 }}>
        <Toolbar />
        <Container maxWidth="xl">
          <SelectContext.Provider value={{ selected, setSelected }}>
            {sectionTitle === SECTION_BRANDS && <Brands />}
            {sectionTitle === SECTION_CAMPAIGNS && <Campaigns />}
            {sectionTitle === SECTION_INFLUENCERS && <Influencers />}
          </SelectContext.Provider>
        </Container>
      </Box>
    </>
  );
}

export default App;
