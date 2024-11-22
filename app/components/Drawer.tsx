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
  
  const [residentialMaterials, setResidentialMaterials] = useState<Material[]>([]);
  const [commercialMaterials, setCommercialMaterials] = useState<Material[]>([]);

  const [loadingResidential, setLoadingResidential] = useState(true);
  const [loadingCommercial, setLoadingCommercial] = useState(true);

  const [residentialSearchValue, setResidentialSearchValue] = useState('');
  const [commercialSearchValue, setCommercialSearchValue] = useState('');

  const [filteredResidentialMaterials, setFilteredResidentialMaterials] = useState<Material[]>([]);
  const [filteredCommercialMaterials, setFilteredCommercialMaterials] = useState<Material[]>([]);

  // Fetch residential materials
  useEffect(() => {
    const fetchResidentialMaterials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'materials'));
        const fetchedMaterials = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Material[];
        setResidentialMaterials(fetchedMaterials);
        setFilteredResidentialMaterials(fetchedMaterials);
        setLoadingResidential(false);
      } catch (error) {
        console.error("Error fetching residential materials:", error);
        setLoadingResidential(false);
      }
    };

    fetchResidentialMaterials();
  }, []);

  // Fetch commercial materials
  useEffect(() => {
    const fetchCommercialMaterials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'commercial')); // Fetch data from 'commercial' collection
        const fetchedMaterials = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Material[];
        setCommercialMaterials(fetchedMaterials);
        setFilteredCommercialMaterials(fetchedMaterials);
        setLoadingCommercial(false);
      } catch (error) {
        console.error("Error fetching commercial materials:", error);
        setLoadingCommercial(false);
      }
    };

    fetchCommercialMaterials();
  }, []);

  // Handle residential search
  const handleResidentialSearchChange = (value: string) => {
    setResidentialSearchValue(value);
    if (value === '') {
      setFilteredResidentialMaterials(residentialMaterials);
    } else {
      const filtered = residentialMaterials.filter((material) =>
        material.name.toLowerCase().includes(value.toLowerCase()) ||
        material.items.some(item =>
          item.toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredResidentialMaterials(filtered);
    }
  };

  // Handle commercial search
  const handleCommercialSearchChange = (value: string) => {
    setCommercialSearchValue(value);
    if (value === '') {
      setFilteredCommercialMaterials(commercialMaterials);
    } else {
      const filtered = commercialMaterials.filter((material) =>
        material.name.toLowerCase().includes(value.toLowerCase()) ||
        material.items.some(item =>
          item.toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredCommercialMaterials(filtered);
    }
  };

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
      {/* Residential Drawer */}
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
              label="Search Materials"
              placeholder="Enter material or item name"
              data={[
                ...residentialMaterials.map(material => material.name),
                ...residentialMaterials.flatMap(material => material.items),
              ]}
              value={residentialSearchValue}
              onChange={handleResidentialSearchChange}
              classNames={{
                root: 'autocomplete',
                dropdown: 'autocomplete-dropdown',
                item: 'autocomplete-item',
              } as Record<string, string>}
            />
            <br />
            {loadingResidential ? (
              <Loader />
            ) : (
              <div className="materials-grid">
                {filteredResidentialMaterials.map((material) => (
                  <div key={material.id} className='material-div'>
                    {material.image ? <img src={material.image} alt={material.name} /> : <Text>No image available</Text>}
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

      {/* Commercial Drawer */}
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
            <Title className='drawer-title'>Commercial Waste</Title><br />
            <Autocomplete
              label="Search Materials"
              placeholder="Enter material or item name"
              data={[
                ...commercialMaterials.map(material => material.name),
                ...commercialMaterials.flatMap(material => material.items),
              ]}
              value={commercialSearchValue}
              onChange={handleCommercialSearchChange}
              classNames={{
                root: 'autocomplete',
                dropdown: 'autocomplete-dropdown',
                item: 'autocomplete-item',
              } as Record<string, string>}
            />
            <br />
            {loadingCommercial ? (
              <Loader />
            ) : (
              <div className="materials-grid">
                {filteredCommercialMaterials.map((material) => (
                  <div key={material.id} className='material-div'>
                    {material.image ? <img src={material.image} alt={material.name} /> : <Text>No image available</Text>}
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
        <Button className="button" onClick={handleOpenCommercial}>Commercial Waste</Button>
      </Box>
    </div>
  );
}
