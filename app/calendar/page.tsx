'use client';

import React, { useState, useEffect } from 'react';
import '../calendar/styles.css';
import { 
  FaRecycle, 
  FaLeaf, 
  FaTrash, 
  FaCalendarDay, 
  FaCalendar, 
  FaCalendarPlus, 
  FaStickyNote, 
  FaBell,
  FaVolumeUp, 
  FaVolumeMute 
} from 'react-icons/fa';
import { useAudio } from '../Audio';

const Calendar: React.FC = () => {
  const { speak, isAudioOn, setIsAudioOn } = useAudio();

  useEffect(() => {
    speak('Welcome to the Calendar page. Here you can view and manage your events.');
  }, [isAudioOn]);

  const handleAudioToggle = () => {
    setIsAudioOn((prev: boolean) => !prev);
};


  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  const today = new Date();

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

  const [activeCase, setActiveCase] = useState('calendar');
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [showNotesInput, setShowNotesInput] = useState(false);
  const [events, setEvents] = useState<{
    time: string; title: string; date: string; description: string 
}[]>([]);
  const [showEventInput, setShowEventInput] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' , time: ''});
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [upcomingReminder, setUpcomingReminder] = useState<string>('No reminders available.');
  const [newNote, setNewNote] = useState(''); // For the input field
  const [filteredEvents, setFilteredEvents] = useState(events); // Initialize with all events
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const calculateUpcomingReminder = (day: number): string => {
    const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
    if (dayOfWeek === 4) {
      return `Compost and Recycle Bin - ${months[currentMonth]} ${day}, 6 AM`;
    } else if (dayOfWeek === 5 && Math.floor((day - 1) / 7) % 2 === 0) {
      return `Black Garbage Bin Collection - ${months[currentMonth]} ${day}, 6 AM`;
    }
    return 'No collection for this day.';
  };

  useEffect(() => {
    setUpcomingReminder(calculateUpcomingReminder(selectedDay));
  }, [selectedDay, currentMonth, currentYear]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => setNotes(e.target.value);
  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });

  const handleSaveNotes = () => {
    if (notes.trim()) {
      setSavedNotes([...savedNotes, notes]);
      setNotes('');
      setShowNotesInput(false);
    }
  };

const saveEvent = () => {
  if (!newEvent.title || !newEvent.date) {
    alert('Please fill in the title and date.');
    return;
  }
  setEvents(prevEvents => [...prevEvents, newEvent]);
  setNewEvent({ title: '', date: '', time: '', description: '' }); // Reset the form
  setShowCreateEventModal(false); // Close the modal
};

// Function to handle deleting an event
const handleDeleteEvent = (index: number) => {
  const updatedEvents = events.filter((_, i) => i !== index);
  setEvents(updatedEvents); // Assuming `events` is part of the component's state
};

const handleEditEvent = (index: number) => {
  const eventToEdit = events[index];

   // Ensure eventToEdit has all required properties
  // Ensure eventToEdit has all required properties
  const updatedEventToEdit = {
    title: eventToEdit.title || '',
    date: eventToEdit.date || '',
    time: eventToEdit.time || '', // Add a default empty string if time is missing
    description: eventToEdit.description || '',
  };

  setNewEvent(updatedEventToEdit);
  setShowCreateEventModal(true); // Open the modal for editing
};

// Function to handle deleting a note
const handleDeleteNote = (index: number) => {
  const updatedNotes = savedNotes.filter((_, i) => i !== index);
  setSavedNotes(updatedNotes); // Assuming `savedNotes` is part of the component's state
};

// Function to handle editing a note
const handleEditNote = (index: number) => {
  const noteToEdit = savedNotes[index];
  const newNote = prompt('Edit your note:', noteToEdit); // Prompt user to edit the note
  if (newNote !== null && newNote.trim() !== '') {
    const updatedNotes = [...savedNotes];
    updatedNotes[index] = newNote;
    setSavedNotes(updatedNotes); // Update the state with the edited note
  }
};



  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDay(today.getDate());
  };
          
          const handleSaveNote = () => {
            if (newNote.trim() !== '') {
              setSavedNotes([...savedNotes, newNote]);
              setNotes('');
            }
          };
          
          const handleDelete = (index: number) => {
            const updatedNotes = savedNotes.filter((_, i) => i !== index);
            setSavedNotes(updatedNotes);
        };
        
        const handleEdit = (index: number) => {
            const noteToEdit = savedNotes[index];
            setNotes(noteToEdit);
            handleDelete(index);
        };
        

          const weekDays = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - date.getDay() + i); // Start from Sunday
            return {
              name: date.toLocaleDateString('en-US', { weekday: 'short' }),
              date: date.getDate(),
            };
          });

          const [filter, setFilter] = useState('month'); // Default view is "month"

          
  const renderMonthlyOverview = () => {
    switch (activeCase) {
      case 'calendar':
        return (
          <div className="monthly-overview-widget">
            <h2>Monthly Schedule Overview</h2>
            <p>Upcoming: {upcomingReminder}</p>
            {savedNotes.length > 0 && <p>Notes: {savedNotes.join(', ')}</p>}
          </div>
        );
      case 'notes':
        return (
          <div className="monthly-overview-widget">
            <h2>Notes Overview</h2>
            {savedNotes.length > 0 ? (
              savedNotes.map((note, index) => <p key={index}>{note}</p>)
            ) : (
              <p>No notes available.</p>
            )}
          </div>
        );
      case 'events':
        return (
          <div className="monthly-overview-widget">
            <h2>Events Overview</h2>
            {events.length > 0 ? (
              events.map((event, index) => (
                <p key={index}>{event.title} on {new Date(event.date).toLocaleDateString()}</p>
              ))
            ) : (
              <p>No events this month.</p>
            )}
          </div>
        );
      default:
        return (
          <div className="monthly-overview-widget">
            <h2>Overview</h2>
            <p>Select a view to see details.</p>
          </div>
        );
    }
  };

  const renderContent = () => {
    switch (activeCase) {
      case 'calendar':
        function handleAddEvent(event: React.MouseEvent<HTMLButtonElement>): void {
          setShowCreateEventModal(true); // Opens the event creation modal
        }

        return (
          <div className="calendar-content">
            <div className="calendar-left-widget">
              <h3 className="month-date">{months[currentMonth]} {selectedDay}</h3>
              <h4 className="time-display">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>
              <div className="class-list">
                <p><FaLeaf /> Compost: Every Thursday, 6 AM</p>
                <p><FaRecycle /> Recycle: Every other Thursday, 6 AM</p>
                <p><FaTrash /> Garbage: Every other Friday, 6 AM</p>

                <button className="toggle-add-note-btn" onClick={() => setShowNotesInput(!showNotesInput)}>
                  {showNotesInput ? 'Cancel' : 'Add Notes'}
                </button>
                {showNotesInput && (
                  <div className="note-input-container">
                    <input
                      type="text"
                      placeholder="Enter your note here..."
                      value={notes}
                      onChange={handleNoteChange}
                    />
                    <button className="add-note-btn" onClick={handleSaveNotes}>+</button>
                  </div>
                )}

                <button className="toggle-add-event-btn" onClick={() => setShowEventInput(!showEventInput)}>
                  {showEventInput ? 'Cancel' : 'Add Event'}
                </button>
                {showEventInput && (
                  <div className="event-input-container">
                    <input
                      type="text"
                      name="title"
                      placeholder="Event Title"
                      value={newEvent.title}
                      onChange={handleEventChange}
                    />
                    <input
                      type="date"
                      name="date"
                      value={newEvent.date}
                      onChange={handleEventChange}
                    />
                    <textarea
                      name="description"
                      placeholder="Event Description"
                      value={newEvent.description}
                      onChange={handleEventChange}
                    />
                    <button className="add-event-btn" onClick={handleAddEvent}>+</button>
                  </div>
                )}

<div className="notes-list">
  {savedNotes.map((note, index) => (
    <div key={index} className="saved-note">
      <span>{note}</span>
      <div className="note-buttons">
        <button onClick={() => handleEditNote(index)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => handleDeleteNote(index)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

<hr className="divider-line" /> {/* Divider Line */}

<div className="events-list">
  {events.map((event, index) => (
    <div key={index} className="saved-event">
      <div className="event-title-date">
        <span className="event-title">{event.title}</span>
        <span className="event-date"> on {new Date(event.date).toLocaleDateString()}</span>
      </div>
      <div className="event-description">{event.description}</div>
      <div className="note-buttons">
        <button onClick={() => handleEditEvent(index)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => handleDeleteEvent(index)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

              </div>
            </div>

            <div className="calendar-right-side">
              <div className="calendar-header">
                <button
                  className="arrow-btn"
                  onClick={() => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))}
                >
                  {'<'}
                </button>
                <div className="month-display">{months[currentMonth]}</div>
                <button
                  className="arrow-btn"
                  onClick={() => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))}
                >
                  {'>'}
                </button>
                <div className="year-display">{currentYear}</div>
              </div>

              <div className="calendar">
                <div className="calendar-grid">
                  <div className="day-names">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="day-header">{day.slice(0, 2).toUpperCase()}</div>
                    ))}
                  </div>
                  <div className="calendar-body">
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <div key={i} className="empty-day"></div>
                    ))}
                    {Array.from({ length: daysInMonth }, (_, i) => (
                      <div
                        key={i}
                        className={`calendar-day ${selectedDay === i + 1 ? 'selected-day' : ''}`}
                        onClick={() => setSelectedDay(i + 1)}
                      >
                        {i + 1}
                        <div className="icon-container">
                          {new Date(currentYear, currentMonth, i + 1).getDay() === 4 && <FaLeaf />}
                          {new Date(currentYear, currentMonth, i + 1).getDay() === 5 && (Math.floor(i / 7) % 2 === 0) && <FaTrash />}
                          {new Date(currentYear, currentMonth, i + 1).getDay() === 4 && <FaRecycle />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="today-btn-container">
                <button className="today-btn" onClick={goToToday}>
                  <FaCalendarDay /> {today.getDate()}
                </button>
              </div>
            </div>
          </div>
        );
        case 'notes':
          
          

          return (
            <div className="calendar-content">
              {/* Left Widget for Features */}
              <div className="calendar-left-widget">
                <h3>Features</h3>
                <ul className="note-features">
                  <li>📝 Notes</li>
                  <li>🔔 Reminders</li>
                  <li>🗑️ Trash</li>
                </ul>
              </div>
        
              {/* Right Widget for Notes */}
              <div className="calendar-right-side">
                <h3>Take Your Notes</h3>
                {/* Input for Notes */}
                <div className="take-note-section">
                  <input
                    type="text"
                    placeholder="Enter your note here..."
                    className="note-input"
                    value={newNote}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <button className="save-note-btn" onClick={handleSaveNotes}>
                    Save Note
                  </button>
                </div>
        
                {/* Saved Notes Section */}
                <div className="saved-notes">
                  {savedNotes.length > 0 ? (
                    savedNotes.map((note, index) => (
                      <div key={index} className="saved-note">
                        <p>{note}</p>
                        <div className="note-buttons">
                          <button className="edit-btn" onClick={() => handleEdit(index)}>
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No notes available.</p>
                  )}
                </div>
              </div>
            </div>
          );
        
         case 'events':
  return (
    <div className="calendar-content">
      {/* Left Widget */}
      <div className="calendar-left-widget">
        {/* Current Date and Create Button */}
        <div className="events-header">
          <div className="current-date">
            {today.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <button
            className="toggle-add-event-btn"
            onClick={() => setShowCreateEventModal(true)}
          >
            + Create Event
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'day' ? 'active' : ''}`}
            onClick={() => setFilter('day')}
          >
            Day
          </button>
          <button
            className={`filter-btn ${filter === 'week' ? 'active' : ''}`}
            onClick={() => setFilter('week')}
          >
            Week
          </button>
          <button
            className={`filter-btn ${filter === 'month' ? 'active' : ''}`}
            onClick={() => setFilter('month')}
          >
            Month
          </button>
        </div>

        {/* Events List */}
        <div className="events-list">
          {filteredEvents.map((event, index) => (
            <div key={index} className="saved-event">
              <div className="event-title-date">
                <span className="event-title">{event.title}</span>
                <span className="event-date">
                  on {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
              <div className="event-description">{event.description}</div>
              <div className="note-buttons">
                <button
                  onClick={() => handleEditEvent(index)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(index)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Event Modal */}
        {showCreateEventModal && (
          <div className="create-event-modal">
            <h3>Create Event</h3>
            <div className="event-input-container">
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
              />
              <textarea
                placeholder="Description"
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
              />
              <button className="add-event-btn" onClick={saveEvent}>
                Save
              </button>
              <button
                className="toggle-add-event-btn"
                onClick={() => setShowCreateEventModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="calendar-right-side">
              <div className="calendar-header">
                <button
                  className="arrow-btn"
                  onClick={() => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))}
                >
                  {'<'}
                </button>
                <div className="month-display">{months[currentMonth]}</div>
                <button
                  className="arrow-btn"
                  onClick={() => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))}
                >
                  {'>'}
                </button>
                <div className="year-display">{currentYear}</div>
              </div>

              <div className="calendar">
                <div className="calendar-grid">
                  <div className="day-names">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="day-header">{day.slice(0, 2).toUpperCase()}</div>
                    ))}
                  </div>
                  <div className="calendar-body">
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <div key={i} className="empty-day"></div>
                    ))}
                    {Array.from({ length: daysInMonth }, (_, i) => (
                      <div
                        key={i}
                        className={`calendar-day ${selectedDay === i + 1 ? 'selected-day' : ''}`}
                        onClick={() => setSelectedDay(i + 1)}
                      >
                        {i + 1}
                        <div className="icon-container">
                          {new Date(currentYear, currentMonth, i + 1).getDay() === 4 && <FaLeaf />}
                          {new Date(currentYear, currentMonth, i + 1).getDay() === 5 && (Math.floor(i / 7) % 2 === 0) && <FaTrash />}
                          {new Date(currentYear, currentMonth, i + 1).getDay() === 4 && <FaRecycle />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="today-btn-container">
                <button className="today-btn" onClick={goToToday}>
                  <FaCalendarDay /> {today.getDate()}
                </button>
              </div>
      </div>
    </div>
  );        

      default:
        return (
          <div className="calendar-content">
            <div className="calendar-left-widget">
              <h3 className="month-date">{months[currentMonth]} {selectedDay}</h3>
              <h4 className="time-display">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>
              <div className="class-list">
                <p><FaLeaf /> Compost: Every Thursday, 6 AM</p>
                <p><FaRecycle /> Recycle: Every other Thursday, 6 AM</p>
                <p><FaTrash /> Garbage: Every other Friday, 6 AM</p>

                <button className="toggle-add-note-btn" onClick={() => setShowNotesInput(!showNotesInput)}>
                  {showNotesInput ? 'Cancel' : 'Add Notes'}
                </button>
                {showNotesInput && (
                  <div className="note-input-container">
                    <input
                      type="text"
                      placeholder="Enter your note here..."
                      value={notes}
                      onChange={handleNoteChange}
                    />
                    <button className="add-note-btn" onClick={handleSaveNotes}>+</button>
                  </div>
                )}

                <button className="toggle-add-event-btn" onClick={() => setShowEventInput(!showEventInput)}>
                  {showEventInput ? 'Cancel' : 'Add Event'}
                </button>
                {showEventInput && (
                  <div className="event-input-container">
                    <input
                      type="text"
                      name="title"
                      placeholder="Event Title"
                      value={newEvent.title}
                      onChange={handleEventChange}
                    />
                    <input
                      type="date"
                      name="date"
                      value={newEvent.date}
                      onChange={handleEventChange}
                    />
                    <textarea
                      name="description"
                      placeholder="Event Description"
                      value={newEvent.description}
                      onChange={handleEventChange}
                    />
                    <button className="add-event-btn" onClick={handleAddEvent}>+</button>
                  </div>
                )}

<div className="notes-list">
  {savedNotes.map((note, index) => (
    <div key={index} className="saved-note">
      <span>{note}</span>
      <div className="note-buttons">
        <button onClick={() => handleEditNote(index)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => handleDeleteNote(index)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

<hr className="divider-line" /> {/* Divider Line */}

<div className="events-list">
  {events.map((event, index) => (
    <div key={index} className="saved-event">
      <div className="event-title-date">
        <span className="event-title">{event.title}</span>
        <span className="event-date"> on {new Date(event.date).toLocaleDateString()}</span>
      </div>
      <div className="event-description">{event.description}</div>
      <div className="note-buttons">
        <button onClick={() => handleEditEvent(index)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => handleDeleteEvent(index)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

              </div>
            </div>

            <div className="calendar-right-side">
              <div className="calendar-header">
                <button
                  className="arrow-btn"
                  onClick={() => setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))}
                >
                  {'<'}
                </button>
                <div className="month-display">{months[currentMonth]}</div>
                <button
                  className="arrow-btn"
                  onClick={() => setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))}
                >
                  {'>'}
                </button>
                <div className="year-display">{currentYear}</div>
              </div>

              <div className="calendar">
                <div className="calendar-grid">
                  <div className="day-names">
                    {daysOfWeek.map((day) => (
                      <div key={day} className="day-header">{day.slice(0, 2).toUpperCase()}</div>
                    ))}
                  </div>
                  <div className="calendar-body">
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <div key={i} className="empty-day"></div>
                    ))}
                    {Array.from({ length: daysInMonth }, (_, i) => (
                      <div
                        key={i}
                        className={`calendar-day ${selectedDay === i + 1 ? 'selected-day' : ''}`}
                        onClick={() => setSelectedDay(i + 1)}
                      >
                        {i + 1}
                        <div className="icon-container">
                          {new Date(currentYear, currentMonth, i + 1).getDay() === 4 && <FaLeaf />}
                          {new Date(currentYear, currentMonth, i + 1).getDay() === 5 && (Math.floor(i / 7) % 2 === 0) && <FaTrash />}
                          {new Date(currentYear, currentMonth, i + 1).getDay() === 4 && <FaRecycle />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="today-btn-container">
                <button className="today-btn" onClick={goToToday}>
                  <FaCalendarDay /> {today.getDate()}
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="calendar-container">
      <div className="audio-icon" onClick={handleAudioToggle}>
        {isAudioOn ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
      </div>

      <div className="navigation-icons">
        <div className="icon-buttons">
          <button onClick={() => setActiveCase('calendar')}><FaCalendar /></button>
          <button onClick={() => setActiveCase('events')}><FaCalendarPlus /></button>
          <button onClick={() => setActiveCase('notes')}><FaStickyNote /></button>
          <button onClick={() => setActiveCase('notifications')}><FaBell /></button>
        </div>
        <p className="active-icon-label">{activeCase.toUpperCase()}</p>
      </div>

      {renderMonthlyOverview()}
      {renderContent()}
    </div>
  );
};

export default Calendar;
