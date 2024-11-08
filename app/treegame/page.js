import { useState } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function TreeGame() {
  const [stage, setStage] = useState(0);
  const [collectedItems, setCollectedItems] = useState([]);
  const [items, setItems] = useState([
    { id: '1', content: 'Water' },
    { id: '2', content: 'Sunlight' },
    { id: '3', content: 'Nutrients' },
  ]);
  const [categories, setCategories] = useState([
    { id: 'category-1', name: 'Essentials', items: [] },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;

    if (sourceDroppableId === destinationDroppableId) {
      const newItems = Array.from(items);
      const [removed] = newItems.splice(sourceIndex, 1);
      newItems.splice(destinationIndex, 0, removed);
      setItems(newItems);
    } else {
      const sourceCategory = categories.find((cat) => cat.id === sourceDroppableId);
      const destinationCategory = categories.find((cat) => cat.id === destinationDroppableId);

      const sourceItems = Array.from(sourceCategory.items);
      const destinationItems = Array.from(destinationCategory.items);

      const [removed] = sourceItems.splice(sourceIndex, 1);
      destinationItems.splice(destinationIndex, 0, removed);

      const newCategories = categories.map((cat) => {
        if (cat.id === sourceDroppableId) {
          return { ...cat, items: sourceItems };
        } else if (cat.id === destinationDroppableId) {
          return { ...cat, items: destinationItems };
        } else {
          return cat;
        }
      });

      setCategories(newCategories);
      setCollectedItems(destinationItems.map((item) => item.content));
    }
  };

  const growTree = () => {
    if (collectedItems.length === items.length && stage < 6) {
      setStage(stage + 1);
      setCollectedItems([]);
    }
  };

  const resetTree = () => {
    setStage(0);
    setCollectedItems([]);
    setItems([
      { id: '1', content: 'Water' },
      { id: '2', content: 'Sunlight' },
      { id: '3', content: 'Nutrients' },
    ]);
    setCategories([
      { id: 'category-1', name: 'Essentials', items: [] },
    ]);
  };

  const stages = [
    { text: '🌱 Plant your seed!', color: '#8B4513' },
    { text: '🌿 Your seed is sprouting!', color: '#228B22' },
    { text: '🌳 Your tree is growing!', color: '#32CD32' },
    { text: '🌼 Your tree is budding!', color: '#FFD700' },
    { text: '🌸 Your tree is blossoming!', color: '#FF69B4' },
    { text: '🍎 Your tree is bearing fruit!', color: '#FF4500' },
    { text: '🌲 Your tree is fully grown!', color: '#006400' },
  ];

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Plant Your Seed</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ color: stages[stage].color }}
      >
        <p>{stages[stage].text}</p>
      </motion.div>
      <div style={{ margin: '20px 0' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(stage / 6) * 100}%` }}
          transition={{ duration: 1 }}
          style={{
            height: '10px',
            backgroundColor: '#32CD32',
            borderRadius: '5px',
          }}
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="items">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} style={{ marginBottom: '20px' }}>
              <h3>Items to Collect:</h3>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: '8px',
                        margin: '4px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '4px',
                        border: '2px solid #000', // Added border for visibility
                        fontWeight: 'bold', // Added bold text for visibility
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {categories.map((category) => (
          <Droppable key={category.id} droppableId={category.id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{ marginBottom: '20px' }}>
                <h3>{category.name}:</h3>
                {category.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: '8px',
                          margin: '4px',
                          backgroundColor: '#d0ffd0',
                          borderRadius: '4px',
                          border: '2px solid #000', // Added border for visibility
                          fontWeight: 'bold', // Added bold text for visibility
                          ...provided.draggableProps.style,
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
      <button onClick={growTree} style={{ marginRight: '10px' }} disabled={collectedItems.length !== items.length}>
        Grow
      </button>
      <button onClick={resetTree}>
        Reset
      </button>
    </div>
  );
}
