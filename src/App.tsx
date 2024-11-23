import React from "react";
import ThemeSwitcher from "components/ThemeSwitcher";
import { Button } from "@mui/material";

const App: React.FC = () => {
  return (
    <div>
      <h1>hello</h1>
      <ThemeSwitcher />
      <Button>test</Button>
    </div>
  );
};

export default App;
