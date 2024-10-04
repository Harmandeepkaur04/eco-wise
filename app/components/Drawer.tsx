'use client';

import { useDisclosure } from '@mantine/hooks';
import { Button, List, Text, Title, Drawer, Box, Image } from "@mantine/core";
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
            <Title className='drawer-title'>Residential Waste</Title><br />
            <div className='material-div'>
            <img src="/tires.png" />
            <Text className='materials'>Automotive</Text>
            <List className='item-list'>
                <List.Item>- Tires with rims (Up to 12 tires per visit)</List.Item>
                <List.Item>- Antifreeze</List.Item>
                <List.Item>- Brake & Transmission Fluid</List.Item>
                <List.Item>- Rust Inhibitors</List.Item>
                <List.Item>- Rust Removers</List.Item>
                <List.Item>- Solvents</List.Item>
                <List.Item>- Automotive Batteries (These are lead-acid batteries. This also includes batteries for motorcycles, RVs, lawn mowers, golf carts and wheel chairs)</List.Item>
                <List.Item>- Motor Oil & Gasoline</List.Item>
            </List>
            </div>
            
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