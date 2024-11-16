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
          // Displays a bell icon for notifications using the FaBell component from Font Awesome
<FaBell className="notification-icon" />

{/*Shows a reminder message with dynamic content based on `upcomingReminder` data*/}
<span>{`Reminder: ${upcomingReminder.type} on ${upcomingReminder.day} at 6 AM`}</span>

{/*Adds a button with an "×" icon to close the notification; triggers `handleCloseNotification` when clicked*/}
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

            {/* Conditionally render the note input form only if `showNotesInput` is true */}
{showNotesInput && (
  <div className={`note-input-container ${isFadingOut ? 'fade-out' : ''}`}>
    {/* Input field for entering a new note */}
    <input
      type="text" // Specifies the input type as text
      id="note-input" // Unique ID for styling or accessibility
      className="note-input" // CSS class for styling the input
      placeholder="Enter your note here..." // Placeholder text to guide the user
      value={notes} // Binds the current `notes` state value to the input
      onChange={handleNoteChange} // Calls `handleNoteChange` on each keystroke to update `notes` state
    />
    {/* Button to save the note when clicked, triggering `handleSaveNotes` */}
    <button className="add-note-btn" onClick={handleSaveNotes}>+</button>
  </div>
)}

{/* Button to toggle the event input form visibility */}
<button className="toggle-add-event-btn" onClick={toggleEventInput}>
  {/* If `showEventInput` is true, display "Cancel", otherwise display "Add Event" */}
  {showEventInput ? 'Cancel' : 'Add Event'}
</button>

{/* Conditionally render the event input form only if `showEventInput` is true */}
{showEventInput && (
  <div className={`event-input-container ${isFadingOut ? 'fade-out' : ''}`}>
    {/* Input field for event title */}
    <input
      type="text" // Input type for text
      name="title" // `name` attribute identifies which part of the `newEvent` object this input updates
      value={newEvent.title} // Binds `newEvent.title` to input
      onChange={handleEventChange} // Calls `handleEventChange` to update `newEvent.title` with user input
      placeholder="Event title" // Placeholder text for guidance
    />
    {/* Input field for selecting the event date */}
    <input
      type="date" // Date input type provides a date picker
      name="date" // `name` attribute specifies which `newEvent` property to update
      value={newEvent.date} // Binds `newEvent.date` to the input
      onChange={handleEventChange} // Updates `newEvent.date` whenever the user selects a date
    />
    {/* Textarea for event description */}
    <textarea
      name="description" // Name specifies which `newEvent` property to update
      value={newEvent.description} // Binds `newEvent.description` to the textarea
      onChange={handleEventChange} // Updates `newEvent.description` with each keystroke
      placeholder="Event description" // Placeholder text for guidance
    />
    {/* Button to add the new event, triggering `handleAddEvent` */}
    <button className="add-event-btn" onClick={handleAddEvent}>+</button>
  </div>
)}

{/* Display list of saved notes */}
<div className="notes-list">
  {/* Iterates over `savedNotes` array to render each note */}
  {savedNotes.map((note, index) => (
    <div key={index} className="saved-note"> {/* `key` ensures each element is uniquely identifiable */}
      <span>{note}</span> {/* Displays the note text */}
      <div className="note-buttons">
        {/* Button to edit the current note, triggering `handleEditNote` with note's index */}
        <button onClick={() => handleEditNote(index)} className="edit-btn">Edit</button>
        {/* Button to delete the current note, triggering `handleDeleteNote` with note's index */}
        <button onClick={() => handleDeleteNote(index)} className="delete-btn">Delete</button>
      </div>
    </div>
  ))}
</div>

{/* Divider line to separate notes and events sections */}
<hr className="divider-line" />

{/* Display list of saved events */}
<div className="events-list">
  {/* Iterates over `events` array to render each event */}
  {events.map((event, index) => (
    <div key={index} className="saved-event"> {/* `key` uniquely identifies each event */}
      <div className="event-title-date">
        {/* Displays the event title */}
        <span className="event-title">{event.title}</span>
        {/* Displays the event date, formatted as a localized date string */}
        <span className="event-date"> on {new Date(event.date).toLocaleDateString()}</span>
      </div>
      {/* Displays the event description */}
      <div className="event-description">{event.description}</div>
      <div className="note-buttons">
        {/* Button to edit the event, calling `handleEditEvent` with the event's index */}
        <button onClick={() => handleEditEvent(index)} className="edit-btn">Edit</button>
        {/* Button to delete the event, calling `handleDeleteEvent` with the event's index */}
        <button onClick={() => handleDeleteEvent(index)} className="delete-btn">Delete</button>
      </div>
    </div>
  ))}
            </div>
          </div>
        </div>

        {/* Right Side Calendar */}
        <div className="calendar-right-side"> {/* Container for the right side of the calendar UI */}
  <div className="calendar-header"> {/* Header of the calendar, containing month navigation and display */}
    
    {/* Button to go to the previous month; if currently on January (0), wraps around to December (11) */}
    <button className="arrow-btn" onClick={() => setCurrentMonth(prev => prev === 0 ? 11 : prev - 1)}>
      {'<'} {/* Left arrow symbol */}
    </button>
    
    {/* Displays the current month with an optional sliding direction class for animation */}
    <div className={`month-display ${monthSlideDirection}`}>{months[currentMonth]}</div>
    
    {/* Button to go to the next month; if currently on December (11), wraps around to January (0) */}
    <button className="arrow-btn" onClick={() => setCurrentMonth(prev => prev === 11 ? 0 : prev + 1)}>
      {'>'} {/* Right arrow symbol */}
    </button>
    
    {/* Displays the current year */}
    <div className="year-display">{currentYear}</div>
  </div>

  <div className="calendar"> {/* Main calendar grid container */}
    <div className="calendar-grid"> {/* Inner grid structure for day headers and dates */}

      {/* Header row displaying the days of the week */}
      <div className="day-names">
        {daysOfWeek.map((day) => ( 
          /* .map() iterates over daysOfWeek array to create a day header for each day.
             `day` represents the current day in the iteration, e.g., 'Sun', 'Mon', etc. */
          <div key={day} className="day-header">{day.slice(0, 2).toUpperCase()}</div>
          /* `day.slice(0, 2).toUpperCase()` extracts the first two characters of each day name, 
             converts them to uppercase, and displays them as headers, like "SU" for Sunday. 
             The `key` prop uniquely identifies each day header. */
        ))}
      </div>

      <div className="calendar-body"> {/* Calendar grid displaying dates and events for the selected month */}
        
        {/* Generates empty cells at the start of the month, aligning the first date correctly based on the day it falls on */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          /* Array.from({ length: firstDayOfMonth }) creates an array with a length equal to `firstDayOfMonth`, 
             which represents the weekday index of the 1st day (0 = Sunday, 1 = Monday, etc.). 
             Each element is an empty placeholder until the first actual date. */
          <div key={i} className="empty-day"></div> 
          /* `key={i}` uniquely identifies each empty cell, and `className="empty-day"` styles the placeholder cells. */
        ))}

        {/* Generates the actual calendar days for the current month */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          /* Array.from({ length: daysInMonth }, (_, i) => i + 1) creates an array with numbers from 1 up to `daysInMonth`, 
             where `daysInMonth` is the total number of days in the selected month. This loop renders each date cell. */

          // Create a date object for the current day
          const date = new Date(currentYear, currentMonth, day);

          // Boolean to check if the date is a garbage collection day; 
          // garbage is collected on Friday (day index 5) and only on alternate weeks.
          const isGarbageDay = date.getDay() === 5 && (Math.floor((day - 1) / 7) % 2 === 0);
          /* `date.getDay() === 5` checks if the day is Friday (5 = Friday).
             `(Math.floor((day - 1) / 7) % 2 === 0)` ensures garbage collection is biweekly. 
             `(day - 1) / 7` finds the zero-based week index, and `% 2 === 0` confirms it's an even week. */

          // Boolean to check if the date is a compost collection day (every Thursday)
          const isCompostDay = date.getDay() === 4;
          /* `date.getDay() === 4` checks if the day is Thursday (4 = Thursday), 
             which is a compost collection day. If true, a compost icon will be displayed on this day. */

          // Searches `events` array to find any event scheduled on this day
          const eventOnDay = events.find(event => new Date(event.date).getDate() === day);
          /* `events.find(...)` checks if any event in the `events` array matches the current `day`.
             `new Date(event.date).getDate() === day` converts each event's date and compares it to the current calendar day.
             If found, `eventOnDay` will store the matched event; otherwise, it will be `undefined`. */

          return (
            <div
              key={day} // Unique key for each date cell in the calendar
              className={`calendar-day ${selectedDay === day ? "selected-day" : ""}`}
              /* `calendar-day` styles each date cell. `selected-day` class is added if `day` equals `selectedDay`, 
                 providing visual feedback to highlight the currently selected date. */
              onClick={() => setSelectedDay(day)} // Sets `selectedDay` to the clicked day
            >
              {day} {/* Displays the day number within the date cell */}

              {/* Container for displaying various icons (e.g., compost, garbage, events) associated with the day */}
              <div className="icon-container">

                {/* Compost icon displayed if `isCompostDay` is true, indicating compost collection on this day */}
                {isCompostDay && <FaLeaf className="icon compost-icon" title="Compost Day" />}
                /* `&&` is a conditional rendering operator here. If `isCompostDay` is true, the `<FaLeaf />` component is rendered.
                   Otherwise, it skips rendering. The `title` attribute shows "Compost Day" on hover. */

                {/* Garbage icon displayed if `isGarbageDay` is true, indicating garbage collection on this day */}
                {isGarbageDay && <FaTrash className="icon trash-icon" title="Garbage Day" />}
                /* `isGarbageDay &&` conditionally displays `<FaTrash />` icon only if `isGarbageDay` is true.
                   This icon represents garbage collection, with a hover tooltip "Garbage Day". */

                {/* Recycling icon, displayed along with compost on Thursdays */}
                {isCompostDay && <FaRecycle className="icon" title="Recycling Day" />}
                /* `isCompostDay &&` conditionally displays the `<FaRecycle />` icon only if `isCompostDay` is true.
                   This icon represents recycling, shown alongside compost icon on Thursdays. */

                {/* Event indicator, represented by a dot, displayed if there is an event on the current day */}
                {eventOnDay && <div className="event-dot" title={eventOnDay.title}></div>}
                /* `eventOnDay &&` conditionally displays a small `event-dot` if `eventOnDay` is not `undefined`.
                   This dot indicates an event scheduled for the current day, with `title` as a tooltip showing event details. */
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
