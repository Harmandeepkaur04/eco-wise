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
  const [searchValue, setSearchValue] = useState(''); // State to track the input in Autocomplete
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]); // State to hold filtered materials

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
        setFilteredMaterials(fetchedMaterials); // Initially show all materials
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching materials:", error);
        setLoading(false); // Stop loading on error
      }
    };

    fetchMaterials(); // Call the function when the component mounts
  }, []);

  // Function to handle search input change and filter materials based on items and material name
  const handleSearchChange = (value: string) => {
    setSearchValue(value);

    if (value === '') {
      // If search is empty, show all materials
      setFilteredMaterials(materials);
    } else {
      // Filter materials where the search query matches either the material name or any of the items
      const filtered = materials.filter((material) =>
        material.name.toLowerCase().includes(value.toLowerCase()) || // Check if the material name matches the query
        material.items.some(item =>
          item.toLowerCase().includes(value.toLowerCase()) // Check if any of the items match the query
        )
      ).map(material => {
        // If the query matches a material name, show all items; otherwise, show only matching items
        if (material.name.toLowerCase().includes(value.toLowerCase())) {
          return material; // Show the full material document with all items
        } else {
          // If searching for an item, only show the matching item
          const filteredItems = material.items.filter(item =>
            item.toLowerCase().includes(value.toLowerCase())
          );
          return { ...material, items: filteredItems }; // Return only the matching items
        }
      });

      setFilteredMaterials(filtered);
    }
  };

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
            
            {/* Autocomplete to search through material names and items */}
            <Autocomplete
              label="Search Materials"
              placeholder="Enter material or item name"
              data={[
                ...materials.map(material => material.name),  // Include material names in the dropdown
                ...materials.flatMap(material => material.items), // Include all items in the dropdown
              ]} 
              value={searchValue} // The current input in the Autocomplete
              onChange={handleSearchChange} // Call handleSearchChange when the user types
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
                {filteredMaterials.map((material) => (
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
