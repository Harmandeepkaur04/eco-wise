'use client';

import { useDisclosure } from '@mantine/hooks';
import { Button, Text, List, Title, Drawer, Box, } from "@mantine/core";
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Drawer.css';

export default function ShepardDrawers() {

    const [residentialOpened, { open: openResidential, close: closeResidential }] = useDisclosure(false);
    const [commercialOpened, { open: openCommercial, close: closeCommercial }] = useDisclosure(false);

    const handleOpenResidential = () => {
      closeCommercial();
      openResidential();
    };

    const handleOpenCommercial = () => {
      closeResidential();
      openCommercial();
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
            <Title>Clean Fill & Industrial Waste</Title>
          </Box>
        </Drawer>
        <Button className="button-2" onClick={handleOpenCommercial}>Clean Fill & Industrial Waste</Button>
      </Box>
        </div>
    )
}