'use client';

import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, List, Text, Title, Drawer, Box, Autocomplete, Loader } from "@mantine/core";
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions
import { db } from '../../firebaseConfig'; // Import Firestore instance
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Drawer.css';

export default function Drawers() {
  const [residentialOpened, { open: openResidential, close: closeResidential }] = useDisclosure(false);
  const [commercialOpened, { open: openCommercial, close: closeCommercial }] = useDisclosure(false);
  
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch materials from Firestore
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'materials')); // Adjust 'materials' to match your Firestore collection
        const fetchedMaterials = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMaterials(fetchedMaterials);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching materials:", error);
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  // Logic to close one drawer when the other opens
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
            <Autocomplete
              label="Search"
              placeholder="Enter Materials"
              data={materials.map((material) => material.name)} // Display material names in the autocomplete
            />
            <br />
            {loading ? (
              <Loader /> // Show a loader while fetching data
            ) : (
              materials.map((material) => (
                <div key={material.id} className='material-div'>
                  <img src={material.image} alt={material.name} />
                  <Text className='materials'>{material.name}</Text>
                  <List className='item-list'>
                    {material.items.map((item, index) => (
                      <List.Item key={index}>{item}</List.Item>
                    ))}
                  </List>
                </div>
              ))
            )}
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
  );
}
