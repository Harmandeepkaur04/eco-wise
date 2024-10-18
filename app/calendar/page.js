"use client";
// Importing React, useState, and useEffect hooks
import React, { useState, useEffect } from 'react';
import '../calendar/styles.css';
import { FaRecycle, FaLeaf, FaTrash, FaCalendarDay } from 'react-icons/fa';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useAudio } from '../Audio'; 

const Calendar = () => {

  const { speak, isAudioOn, setIsAudioOn } = useAudio();
  
  useEffect(() => {
    speak('Welcome to the Calendar page. Here you can view and manage your events.');
  }, [speak, isAudioOn]);

  const handleAudioToggle = () => {
    setIsAudioOn((prev) => !prev);
  };



  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  const today = new Date();

  // A function to calculate the number of days in a given month and year.
  // It creates a new Date object, where 'month + 1' points to the next month, and 0 gives the last day of the previous month
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  // State to store the notes entered by the user in the input field.
  const [notes, setNotes] = useState('');
  
  // State to store an array of saved notes.
  const [savedNotes, setSavedNotes] = useState([]);
  
  // State to toggle whether the notes input box is visible or hidden.
  const [showNotes, setShowNotes] = useState(false);
  
  // State to track the currently selected day in the calendar. It defaults to today's date.
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  
  // State to track the current month. It defaults to the current month (0-11).
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  
  // State to track the current year. It defaults to the current year.
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [upcomingReminder, setUpcomingReminder] = useState({});
  const [editingIndex, setEditingIndex] = useState(null); // For tracking which note is being edited
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);

  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i); // Creating an array of 5 years around the current year. 
  // This will generate an array of years centered on the current year (e.g., [2022, 2023, 2024, 2025, 2026]).
  
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

        {/* Audio Control Icon */}
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <div onClick={handleAudioToggle} style={{ cursor: 'pointer' }}>
          {isAudioOn ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
        </div>
      </div>


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

        <div className="calendar-right-side">
          {/* Calendar Header Divided into Three Columns */}
          <div className="calendar-header">
            <div className="calendar-header-left">
              <div 
                className="month-display" 
                onMouseEnter={handleMouseEnterMonth} 
                onMouseLeave={handleMouseLeavePicker} 
                onClick={handleMouseEnterMonth}
              >
                {months[currentMonth]}
              </div>
            </div>

            {/* Middle section for pickers */}
            <div className="calendar-header-middle">
              {showMonthPicker && (
                <div className="month-picker">
                  {months.map((month, index) => (
                    <div key={index} onClick={() => handleMonthSelect(index)} className="month-option">
                      {month}
                    </div>
                  ))}
                </div>
              )}

              {showYearPicker && (
                <div className="year-picker">
                  {years.map((year) => (
                    <div key={year} onClick={() => handleYearSelect(year)} className="year-option">
                      {year}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="calendar-header-right">
              <div 
                className="year-display" 
                onMouseEnter={handleMouseEnterYear} 
                onMouseLeave={handleMouseLeavePicker} 
                onClick={handleMouseEnterYear}
              >
                {currentYear}
              </div>
            </div>
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
                  const isGarbageDay = date.getDay() === 5 && (Math.floor((day - 1) / 7) % 2 === 0); // Check for every other Friday
                  const isCompostDay = date.getDay() === 4; // Check for Thursday

                  return (
                    <div
                      key={day}
                      className={`calendar-day ${selectedDay === day ? "selected-day" : ""}`}
                      onClick={() => {
                        setSelectedDay(day);
                      }}
                    >
                      {day}
                      <div className="icon-container">
                        {isCompostDay && (
                          <FaLeaf className="icon compost-icon" title="Compost Day" />
                        )}
                        {isGarbageDay && (
                          <FaTrash className="icon trash-icon" title="Garbage Day" />
                        )}
                        {isCompostDay && (
                          <FaRecycle className="icon" title="Recycling Day" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="today-btn-container">
            <button className="today-btn" onClick={goToToday}>
              <FaCalendarDay /> {today.getDate()} {/* Display the current date with the icon */}
            </button>
          </div>
        </div>
      </div>

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
              onChange={handleNoteChange}
            />
            <button className="save-btn" onClick={handleSaveNotes}>
              {editingIndex !== null ? 'Update Note' : 'Save Note'}
            </button>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
