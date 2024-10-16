'use client';

import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Button, List, Text, Title, Drawer, Box, Autocomplete, Loader } from "@mantine/core";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Drawer.css';
import '@mantine/core/styles/Loader.css';
import '@mantine/core/styles/Combobox.css';


interface Material {
  id: string;
  name: string;
  image: string;
  items: string[];
}

export default function Drawers() {
  const [residentialOpened, { open: openResidential, close: closeResidential }] = useDisclosure(false);
  const [commercialOpened, { open: openCommercial, close: closeCommercial }] = useDisclosure(false);
  
  const [materials, setMaterials] = useState<Material[]>([]); // State to hold materials
  const [loading, setLoading] = useState(true); // State to manage loading
  const [allItems, setAllItems] = useState([]); // State to hold all material items

  // Fetch materials from Firestore
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'materials')); // Fetch materials from 'materials' collection
        const fetchedMaterials = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Material[]; // Cast the result as an array of Material
        setMaterials(fetchedMaterials); // Update state with fetched materials

        const items = fetchedMaterials.flatMap((material) => material.items);
        setAllItems(items); // Update state with all items
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching materials:", error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchMaterials(); // Call the function when the component mounts
  }, []);

  // Logic to close one drawer when the other opens
  const handleOpenResidential = () => {
    closeCommercial(); // Close the commercial drawer if it's open
    openResidential();  // Open the residential drawer
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
            
            {/* Autocomplete to search through all items */}
            <Autocomplete
              label="Search Materials"
              placeholder="Enter material name"
              data={allItems}
              classNames={{
                root: 'autocomplete',
                dropdown: 'autocomplete-dropdown',
                item: 'autocomplete-item',
              } as Record<string, string>}
            />
            <br />
            {loading ? (
              <Loader />
            ) : (
              <div className="materials-grid">
                {materials.map((material) => (
                  <div key={material.id} className='material-div'>
                    <img src={material.image} alt={material.name} />
                    <Text className='materials'>{material.name}</Text>
                    <List className='item-list'>
                      {material.items.map((item, index) => (
                        <List.Item key={index}>{item}</List.Item>
                      ))}
                    </List>
                  </div>
                ))}
              </div>
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
