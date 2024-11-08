"use client";

import React, { useState, useEffect } from 'react';
import '../calendar/styles.css';
import { FaRecycle, FaLeaf, FaTrash, FaCalendarDay, FaVolumeUp, FaVolumeMute, FaBell } from 'react-icons/fa';
import { useAudio } from '../Audio';

const Calendar = () => {
  // Destructuring functions and state variables from useAudio to control audio notifications
  const { speak, isAudioOn, setIsAudioOn } = useAudio();

  // Effect to play a welcome audio message when the component is loaded
  useEffect(() => {
    speak('Welcome to the Calendar page. Here you can view and manage your events.');
  }, [isAudioOn]);

  // Function to toggle audio notifications on/off
  const handleAudioToggle = () => {
    setIsAudioOn((prev) => !prev);
  };

  // Day and date setup
  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  const today = new Date();

  // Utility function to get the number of days in a given month and year
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  // State variables to manage notes, events, calendar view, and reminders
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [showNotesInput, setShowNotesInput] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [events, setEvents] = useState([]);
  const [showEventInput, setShowEventInput] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [upcomingReminder, setUpcomingReminder] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingEventIndex, setEditingEventIndex] = useState(null);
  const [monthSlideDirection, setMonthSlideDirection] = useState('');
  const [showNotification, setShowNotification] = useState(false); // New state for notification display

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Function to get the current time formatted as "HH:MM AM/PM"
  const getLocalTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Function to calculate the next reminder based on the selected date and collection days
  const calculateUpcomingReminder = (day) => {
    const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();

    // Set compost and recycle day reminders for Thursday, garbage for biweekly Fridays
    if (dayOfWeek === 4) {
      return { date: day, type: 'Compost and Recycle Bin', icon: [<FaRecycle key="recycle" />, <FaLeaf key="leaf" />], day: 'Thursday' };
    } else if (dayOfWeek === 5 && (Math.floor((day - 1) / 7) % 2 === 0)) {
      return { date: day, type: 'Black Garbage Bin Collection', icon: <FaTrash key="trash" />, day: 'Friday' };
    } else {
      return { date: day, type: 'No Collection', icon: null, day: '' };
    }
  };

  // Handler to update note input field
  const handleNoteChange = (e) => setNotes(e.target.value);

  // Toggle for showing/hiding note input with fade-out effect
  const toggleNotesInput = () => {
    if (showNotesInput) {
      setIsFadingOut(true);
      setTimeout(() => {
        setShowNotesInput(false);
        setIsFadingOut(false);
      }, 500);
    } else {
      setShowNotesInput(true);
    }
  };

  // Handler for toggling event input field display with fade-out effect
  const handleEventChange = (e) => setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  const toggleEventInput = () => {
    if (showEventInput) {
      setIsFadingOut(true);
      setTimeout(() => {
        setShowEventInput(false);
        setIsFadingOut(false);
      }, 500);
    } else {
      setShowEventInput(true);
    }
  };

  // `handleSaveNotes` saves the current note text to `savedNotes` array and clears the input if valid
  const handleSaveNotes = () => {
    if (notes.trim()) { // Checks if the input is not empty
      if (editingIndex !== null) { // If editing an existing note, update it in the `savedNotes` array
        const updatedNotes = savedNotes.map((note, index) =>
          index === editingIndex ? notes : note // Replaces the note at the editing index
        );
        setSavedNotes(updatedNotes); // Updates savedNotes with edited note
        setEditingIndex(null); // Resets editing index
      } else {
        setSavedNotes([...savedNotes, notes]); // Adds new note if not editing
      }
      setNotes(''); // Clears the note input field
      setShowNotesInput(false); // Hides the note input field
    }
  };

   // `handleAddEvent` saves a new event to `events` array or updates an existing event if editing
   const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) { // Checks if title and date fields are not empty
      if (editingEventIndex !== null) { // Updates existing event if editing
        const updatedEvents = events.map((event, index) =>
          index === editingEventIndex ? newEvent : event // Replaces event at editing index
        );
        setEvents(updatedEvents); // Updates events array with edited event
        setEditingEventIndex(null); // Resets editing event index
      } else {
        setEvents([...events, newEvent]); // Adds new event if not editing
      }
      setNewEvent({ title: '', date: '', description: '' }); // Clears event input fields
      setShowEventInput(false); // Hides the event input form
    }
  };

// `handleEditNote` loads a specific note into the input field for editing
const handleEditNote = (index) => {
  setNotes(savedNotes[index]); // Sets `notes` to the selected note’s content
  setEditingIndex(index); // Stores the index of the note being edited
  setShowNotesInput(true); // Shows the note input field for editing
};

// `handleDeleteNote` removes a note from `savedNotes` by filtering it out by index
const handleDeleteNote = (index) => {
  const updatedNotes = savedNotes.filter((_, i) => i !== index); // Excludes the note at the specified index
  setSavedNotes(updatedNotes); // Updates `savedNotes` with filtered notes
};

// `handleEditEvent` loads a specific event into the input fields for editing
const handleEditEvent = (index) => {
  setNewEvent(events[index]); // Sets `newEvent` to the selected event’s details
  setEditingEventIndex(index); // Stores index of event being edited
  setShowEventInput(true); // Shows event input field for editing
};

// `handleDeleteEvent` removes an event from `events` by filtering it out by index
const handleDeleteEvent = (index) => {
  const updatedEvents = events.filter((_, i) => i !== index); // Excludes the event at the specified index
  setEvents(updatedEvents); // Updates `events` with the remaining events
};

  // Reset calendar view to today’s date
  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDay(today.getDate());
  };

  // Calculate upcoming reminders and show notification if relevant
  useEffect(() => {
    const reminder = calculateUpcomingReminder(selectedDay);
    setUpcomingReminder(reminder);

    if (reminder.type !== 'No Collection') {
      setShowNotification(true); // Show notification banner for scheduled reminders
    }
  }, [selectedDay, currentMonth, currentYear]);

  // Close notification banner
  const handleCloseNotification = () => setShowNotification(false);

  return (
    <div className="calendar-container">

      {/* Notification Banner */}
      {showNotification && (
        <div className="notification-banner">
          <FaBell className="notification-icon" />
          <span>{`Reminder: ${upcomingReminder.type} on ${upcomingReminder.day} at 6 AM`}</span>
          <button className="close-btn" onClick={handleCloseNotification}>×</button>
        </div>
      )}

      {/* Audio Control Icon */}
      <div className="audio-icon" style={{ textAlign: 'center', margin: '20px 0' }}>
        <div onClick={handleAudioToggle} style={{ cursor: 'pointer' }}>
          {isAudioOn ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
        </div>
      </div>

      {/* Monthly Overview */}
      <div className="monthly-overview-widget">
        <h2>Monthly Schedule Overview</h2>
        <p>Upcoming: {months[currentMonth]} {upcomingReminder.date}, {upcomingReminder.type} 6 AM {upcomingReminder.icon}</p>
        {savedNotes.length > 0 && <p>Notes: {savedNotes.join(', ')}</p>}
      </div>

      <div className="calendar-content">
        <div className="calendar-left-widget">
          <h3 className="month-date">{months[currentMonth]} {selectedDay}</h3>
          <h4 className="time-display">{getLocalTime()}</h4>

          <div className="class-list">
            <p><FaLeaf /> Compost: Every Thursday, 6 AM</p>
            <p><FaTrash /> Garbage: Every other Friday, 6 AM</p>

            {/* Add Notes Button */}
            <button className="toggle-add-note-btn" onClick={toggleNotesInput}>
              {showNotesInput ? 'Cancel' : 'Add Notes'}
            </button>

            {showNotesInput && (
              <div className={`note-input-container ${isFadingOut ? 'fade-out' : ''}`}>
                <input
                  type="text"
                  id="note-input"
                  className="note-input"
                  placeholder="Enter your note here..."
                  value={notes}
                  onChange={handleNoteChange}
                />
                <button className="add-note-btn" onClick={handleSaveNotes}>+</button>
              </div>
            )}

            {/* Add Event Button */}
            <button className="toggle-add-event-btn" onClick={toggleEventInput}>
              {showEventInput ? 'Cancel' : 'Add Event'}
            </button>

            {showEventInput && (
              <div className={`event-input-container ${isFadingOut ? 'fade-out' : ''}`}>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleEventChange}
                  placeholder="Event title"
                />
                <input
                  type="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleEventChange}
                />
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleEventChange}
                  placeholder="Event description"
                />
                <button className="add-event-btn" onClick={handleAddEvent}>+</button>
              </div>
            )}

            {/* Display Saved Notes */}
            <div className="notes-list">
              {savedNotes.map((note, index) => (
                <div key={index} className="saved-note">
                  <span>{note}</span>
                  <div className="note-buttons">
                    <button onClick={() => handleEditNote(index)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDeleteNote(index)} className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>

            <hr className="divider-line" /> {/* Divider Line */}

            {/* Display Saved Events */}
            <div className="events-list">
              {events.map((event, index) => (
                <div key={index} className="saved-event">
                  <div className="event-title-date">
                    <span className="event-title">{event.title}</span> 
                    <span className="event-date"> on {new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="event-description">{event.description}</div>
                  <div className="note-buttons">
                    <button onClick={() => handleEditEvent(index)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDeleteEvent(index)} className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Calendar */}
        <div className="calendar-right-side">
          <div className="calendar-header">
            <button className="arrow-btn" onClick={() => setCurrentMonth(prev => prev === 0 ? 11 : prev - 1)}>
              {'<'}
            </button>
            <div className={`month-display ${monthSlideDirection}`}>{months[currentMonth]}</div>
            <button className="arrow-btn" onClick={() => setCurrentMonth(prev => prev === 11 ? 0 : prev + 1)}>
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
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                  const date = new Date(currentYear, currentMonth, day);
                  const isGarbageDay = date.getDay() === 5 && (Math.floor((day - 1) / 7) % 2 === 0);
                  const isCompostDay = date.getDay() === 4;
                  const eventOnDay = events.find(event => new Date(event.date).getDate() === day);

                  return (
                    <div
                      key={day}
                      className={`calendar-day ${selectedDay === day ? "selected-day" : ""}`}
                      onClick={() => setSelectedDay(day)}
                    >
                      {day}
                      <div className="icon-container">
                        {isCompostDay && <FaLeaf className="icon compost-icon" title="Compost Day" />}
                        {isGarbageDay && <FaTrash className="icon trash-icon" title="Garbage Day" />}
                        {isCompostDay && <FaRecycle className="icon" title="Recycling Day" />}
                        {eventOnDay && <div className="event-dot" title={eventOnDay.title}></div>}
                      </div>
                    </div>
                  );
                })}
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
    </div>
  );
};

export default Calendar;
