import Viewer from './viewer/viewer'
import Grid from '@mui/material/Grid';

function App() {
  return (
    <div>
      <Grid container spacing={2} style={{height: "100%", alignItems:"stretch"}}>
        <Grid item xs={8} style={{height:"100%"}}>
          <Viewer/>
        </Grid>
        <Grid item xs={4}>
          <h1>hello</h1>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
