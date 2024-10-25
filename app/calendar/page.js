"use client";

import React, { useState, useEffect } from 'react';
import '../calendar/styles.css';
import { FaRecycle, FaLeaf, FaTrash, FaCalendarDay } from 'react-icons/fa';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { useAudio } from '../Audio';
 

const Calendar = () => {
  const { speak, isAudioOn, setIsAudioOn } = useAudio(); // Moved this inside the component to avoid execution error

  useEffect(() => {
    speak('Welcome to the Calendar page. Here you can view and manage your events.');
  }, [isAudioOn]);

  const handleAudioToggle = () => {
    setIsAudioOn((prev) => !prev);
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  const today = new Date();

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]); // Store notes as an array
  const [showNotesInput, setShowNotesInput] = useState(false); // State for toggling the note input
  const [isFadingOut, setIsFadingOut] = useState(false); // State for controlling fade-out animation
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [upcomingReminder, setUpcomingReminder] = useState({});
  const [editingIndex, setEditingIndex] = useState(null); // For tracking which note is being edited
  const [monthSlideDirection, setMonthSlideDirection] = useState(''); // For slide animation direction

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const getLocalTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const calculateUpcomingReminder = (day) => {
    const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();

    if (dayOfWeek === 4) { // Thursday
      return { date: day, type: 'Compost and Recycle Bin', icon: [<FaRecycle key="recycle" />, <FaLeaf key="leaf" />], day: 'Thursday' };
    } else if (dayOfWeek === 5 && (Math.floor((day - 1) / 7) % 2 === 0)) { // Every other Friday
      return { date: day, type: 'Black Garbage Bin Collection', icon: <FaTrash key="trash" />, day: 'Friday' };
    } else {
      return { date: day, type: 'No Collection', icon: null, day: '' };
    }
  };

  const handleNoteChange = (e) => setNotes(e.target.value);

  const toggleNotesInput = () => {
    if (showNotesInput) {
      setIsFadingOut(true); // Trigger fade-out animation
      setTimeout(() => {
        setShowNotesInput(false); // Hide input after animation
        setIsFadingOut(false); // Reset fading out state
      }, 500); // Match animation duration
    } else {
      setShowNotesInput(true); // Show input immediately
    }
  };

  const handleSaveNotes = () => {
    if (notes.trim()) {
      if (editingIndex !== null) {
        const updatedNotes = savedNotes.map((note, index) =>
          index === editingIndex ? notes : note
        );
        setSavedNotes(updatedNotes);
        setEditingIndex(null);
      } else {
        setSavedNotes([...savedNotes, notes]);
      }
      setNotes(''); // Clear input after saving
      setShowNotesInput(false); // Hide the input field after saving
    }
  };

  const handleEditNote = (index) => {
    setNotes(savedNotes[index]);
    setEditingIndex(index);
    setShowNotesInput(true); // Show input when editing
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

  const handleMonthChange = (direction) => {
    setMonthSlideDirection(direction);
    setTimeout(() => {
      if (direction === 'left') {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        if (currentMonth === 0) {
          setCurrentYear((prevYear) => prevYear - 1);
        }
      } else {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        if (currentMonth === 11) {
          setCurrentYear((prevYear) => prevYear + 1);
        }
      }
      setMonthSlideDirection('');
    }, 300); // Match animation duration
  };

  useEffect(() => {
    const reminder = calculateUpcomingReminder(selectedDay);
    setUpcomingReminder(reminder);
  }, [selectedDay, currentMonth, currentYear]);

  return (
    <div className="calendar-container">

      {/* Audio Control Icon */}
      <div className="audio-icon" style={{ textAlign: 'center', margin: '20px 0' }}>
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

            {/* Add Notes Button */}
            <button className="toggle-add-note-btn" onClick={toggleNotesInput}>
              {showNotesInput ? 'Cancel' : 'Add Notes'}
            </button>

            {/* Notes Input Field with Add Button Inside */}
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
          </div>
        </div>

        {/* Right Side Calendar */}
        <div className="calendar-right-side">
          {/* Calendar Header with Arrows */}
          <div className="calendar-header">
            <button className="arrow-btn" onClick={() => handleMonthChange('left')}>
              {'<'}
            </button>
            <div className={`month-display ${monthSlideDirection}`}>
              {months[currentMonth]}
            </div>
            <button className="arrow-btn" onClick={() => handleMonthChange('right')}>
              {'>'}
            </button>
            <div className="year-display">{currentYear}</div>
          </div>

          {/* Calendar Grid */}
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
