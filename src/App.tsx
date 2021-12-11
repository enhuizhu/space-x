import React, { useEffect, useState } from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import { StyledGrid } from './App.style';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { ObjectViewer } from './Components/ObjectViewer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function App() {
  const [rowData, setRowData ] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentMission, setCurrentMission] = useState({});
  
  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    fetch('https://api.spacexdata.com/v3/launches?limit=50')
      .then(res => res.json())
      .then(data => {
        const transformedData = data.map((d:any) => {
          d.launch_date_utc = new Date(d.launch_date_utc);
          return d;
        });

        setRowData(transformedData);
      });
  }, []);

  return (
    <div>
      <StyledGrid className="ag-theme-alpine">
        <AgGridReact rowData={rowData}>
          <AgGridColumn 
            field="mission_name" 
            headerName="Mission Name" 
            sortable={true}
            filter={true}
            floatingFilter={true}
          />
          <AgGridColumn 
            field="launch_date_utc" 
            headerName="Date" 
            sortable={true}
            valueFormatter={({value}) => {
              return moment(value).format('DD / MM / YYYY');
            }}
            width={300}
          />
          <AgGridColumn
            valueFormatter={() => 'View Detail'}
            cellStyle={{cursor: 'pointer'}}
            onCellClicked={({data}) => {
              setCurrentMission(data);
              setOpen(true);
            }}
            field="detail"/>
        </AgGridReact>
      </StyledGrid>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" data-testid="dialog-title">
          Mission Detail
        </DialogTitle>
        <DialogContent>
          <ObjectViewer obj={currentMission} isChild={false}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
