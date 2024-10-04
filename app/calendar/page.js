"use client";

import React, { useState } from 'react';
import '../calendar/styles.css';
import { FaRecycle, FaLeaf, FaTrash } from 'react-icons/fa';

const Calendar = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  const today = new Date();

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]); // Store notes as an array
  const [showNotes, setShowNotes] = useState(false);
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [upcomingReminder, setUpcomingReminder] = useState({});
  const [editingIndex, setEditingIndex] = useState(null); // For tracking which note is being edited
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const getLocalTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const calculateUpcomingReminder = (day) => {
    const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();

    // Check for compost and recycle bins
    if (dayOfWeek === 4) { // Thursday
      return { date: day, type: 'Compost and Recycle Bin', icon: [<FaRecycle />, <FaLeaf />], day: 'Thursday' };
    } else if (dayOfWeek === 5 && (Math.floor((day - 1) / 7) % 2 === 0)) { // Every other Friday
      return { date: day, type: 'Black Garbage Bin Collection', icon: <FaTrash />, day: 'Friday' };
    } else {
      return { date: day, type: 'No Collection', icon: null, day: '' };
    }
    };

    const handleNoteChange = (e) => setNotes(e.target.value);
  const toggleNotes = () => setShowNotes(!showNotes);

  const handleSaveNotes = () => {
    if (notes.trim()) {
      if (editingIndex !== null) {
        // Update existing note
        const updatedNotes = savedNotes.map((note, index) =>
          index === editingIndex ? notes : note
        );
        setSavedNotes(updatedNotes);
        setEditingIndex(null);
      } else {
        // Add new note
        setSavedNotes([...savedNotes, notes]);
      }
      setNotes(''); // Clear input after saving
      setShowNotes(false); // Optionally hide the notes input after saving
    }
  };

  const handleEditNote = (index) => {
    setNotes(savedNotes[index]);
    setEditingIndex(index);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(updatedNotes);
  };

  const goToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDay(today.getDate());
  };

  const handleMonthSelect = (monthIndex) => {
    setCurrentMonth(monthIndex);
    setShowMonthPicker(false);
  };

  const handleYearSelect = (year) => {
    setCurrentYear(year);
    setShowYearPicker(false);
  };

  useEffect(() => {
    const reminder = calculateUpcomingReminder(selectedDay);
    setUpcomingReminder(reminder);
  }, [selectedDay, currentMonth, currentYear]);

  const handleMouseEnterMonth = () => {
    setShowMonthPicker(true);
  };

  const handleMouseEnterYear = () => {
    setShowYearPicker(true);
  };

  const handleMouseLeavePicker = () => {
    setTimeout(() => {
      setShowMonthPicker(false);
      setShowYearPicker(false);
    }, 5000); // Change to 5000ms (5 seconds)
  };


  return (
    <div className="calendar-container">
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
            {savedNotes.length > 0 && (
              <div className="saved-notes">
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
            )}
          </div>
        </div>

          {/* Right-side Calendar */}
          <div className="calendar-right-side">
            {/* Calendar Header */}
            <div className="calendar-header">
              <h2>SEPTEMBER</h2>
              <span className="year-display">2023</span>
            </div>

            {/* Calendar Grid */}
            <div className="calendar">
              <div className="calendar-grid">
                <div className="day-names">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="day-header">
                      {day.slice(0, 2).toUpperCase()} {/* Showing only two letters of the names of the days of the week */}
                    </div>
                  ))}
                </div>
                <div className="calendar-body">
                  {daysInMonth.map((day) => (
                    <div key={day} className="calendar-day">
                      {day}
                      {/* Add icons for specific days */}
                      {(day === 4 || day === 11 || day === 18 || day === 25) && (
                        <FaRecycle className="icon" title="Recycling Day" />
                      )} {/* Recycling days on every Thursday */}
                      {(day === 5 || day === 19) && (
                        <FaTrash className="icon trash-icon" title="Trash Day" />
                      )} {/* Trash days on every other Friday */}
                      {(day === 6 || day === 13 || day === 20 || day === 27) && (
                        <FaLeaf className="icon compost-icon" title="Compost Day" />
                      )} {/* Compost days on every Saturday */} {/*  add the option to have customization as well for the icons ex. click a button to specific day */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note-taking section */}
        <div className="calendar-options">
          <button className="calendar-btn" onClick={toggleNotes}>
            {showNotes ? 'Hide Notes' : 'Add Notes'}
          </button>
          {showNotes && (
            <div className="note-box">
              <textarea
                className="note-input"
                placeholder="Add your notes here..."
                value={notes}
                onChange={handleNoteChange} />
              <button className="save-btn" onClick={handleSaveNotes}>
                Save Notes
              </button>
            </div>
          )}
        </div>
      </div>
  );
};

export default Calendar;
