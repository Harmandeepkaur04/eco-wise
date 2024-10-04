'use client';

import { useDisclosure } from '@mantine/hooks';
import { Button, Text, Table, Container, Paper, Group, Title, Grid, Drawer, Box, } from "@mantine/core";
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Drawer.css';

export default function Drawers() {

    //Constant for Drawer component
    const [residentialOpened, { open: openResidential, close: closeResidential }] = useDisclosure(false);
    const [commercialOpened, { open: openCommercial, close: closeCommercial }] = useDisclosure(false);

  // Logic to close one drawer when the other opens
    const handleOpenResidential = () => {
      closeCommercial(); // Close the commercial drawer if it's open
      openResidential();  // Open the residential drawer
    };

    const handleOpenCommercial = () => {
      closeResidential(); // Close the residential drawer if it's open
      openCommercial();   // Open the commercial drawer
    };


    return (
        <div>
            <Box>
        <Drawer
          className="drawer"
          position="right"
          size="xl"
          opened={residentialOpened}
          onClose={closeResidential}
          withCloseButton={false}
          classNames={{ overlay: 'drawer-overlay' }}
        >
          <Box className="drawer-content">
            <Title>Residential Waste</Title>
          </Box>
        </Drawer>
        <Button className="button" onClick={handleOpenResidential}>Residential Waste</Button>
      </Box>

      <Box>
        <Drawer
          className="drawer"
          position="right"
          size="xl"
          opened={commercialOpened}
          onClose={closeCommercial}
          withCloseButton={false}
          classNames={{ overlay: 'drawer-overlay' }}
        >
          <Box className="drawer-content">
            <Title>Commercial Waste</Title>
          </Box>
        </Drawer>
        <Button className="button" onClick={handleOpenCommercial}>Commercial Waste</Button>
      </Box>
        </div>
    )
}