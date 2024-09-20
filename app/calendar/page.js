"use client";

import React, { useState } from 'react';
import '../calendar/styles.css';
import { FaRecycle, FaLeaf, FaTrash, FaEdit, FaTrashAlt } from 'react-icons/fa';

const Calendar = () => {
  const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1); // September has 30 days
  
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [showNotes, setShowNotes] = useState(false);
  const [placeNoteBelowOverview, setPlaceNoteBelowOverview] = useState(true);

  const handleNoteChange = (e) => setNotes(e.target.value);
  const toggleNotes = () => setShowNotes(!showNotes);
  const handleTogglePlacement = () => setPlaceNoteBelowOverview(!placeNoteBelowOverview);

  // Save notes and display them in the reminders widget
  const handleSaveNotes = () => {
    const newNote = {
      id: Date.now(),
      text: notes,
      placeBelowOverview: placeNoteBelowOverview,
    };
    setSavedNotes([...savedNotes, newNote]);
    setNotes('');
    setShowNotes(false); // Hides the note input after saving
  };

  // Edit note function
  const handleEditNote = (id) => {
    const noteToEdit = savedNotes.find(note => note.id === id);
    setNotes(noteToEdit.text);
    handleDeleteNote(id); // Remove old note, so we can save the new one
    setShowNotes(true);
  };

  // Delete note function
  const handleDeleteNote = (id) => {
    setSavedNotes(savedNotes.filter(note => note.id !== id));
  };

  return (
<<<<<<< Updated upstream
    <><header>
      <nav>
        <ul>
          <h1>EcoWise</h1>
          <li><Link href="/recycle-page">Recycle</Link></li>
          <li><Link href="/disposal">Disposal
          </Link></li>
          <li><Link href="/rewards-page">Rewards</Link></li>
          <li><Link href="/calendar">Calendar</Link></li>
          <li><Link href="/profile">Profile</Link></li>
        </ul>
      </nav>
    </header><div className="calendar-container">
        {/* Monthly Schedule Overview Widget */}
        <div className="monthly-overview-widget">
          <h2>Monthly Schedule Overview</h2>
          <p>Upcoming: September 20, Compost Bin 6 AM</p>
          {savedNotes && <p>{savedNotes}</p>} {/* Display saved notes here */}
        </div>

        {/* Split screen layout */}
        <div className="calendar-content">
          {/* Left Box */}
          <div className="calendar-left-widget">
            {/* Month, Date, and Time on Top */}
            <h3 className="month-date">September 11</h3>
            <h4 className="time-display">6:00 AM</h4>
            {/* Class List */}
            <div className="class-list">
              <p><FaLeaf /> Compost: September 20, 6 AM</p>
              <p><FaRecycle /> Recycling: Every Thursday, 6 AM</p>
              <p><FaTrash /> Black Garbage: Every other Friday, 6 AM</p>
              {savedNotes && <p>Note: {savedNotes}</p>} {/* Display saved notes here */}
=======
    <div className="calendar-container">
      {/* Monthly Schedule Overview Widget */}
      <div className="monthly-overview-widget">
        <h2>Monthly Schedule Overview</h2>
        <p>Upcoming: September 20, Compost Bin 6 AM</p>
        {savedNotes.filter(note => note.placeBelowOverview).map((note) => (
          <div key={note.id} className="note-display">
            {note.text}
            <div className="note-actions">
              <FaEdit className="icon edit-icon" onClick={() => handleEditNote(note.id)} />
              <FaTrashAlt className="icon delete-icon" onClick={() => handleDeleteNote(note.id)} />
>>>>>>> Stashed changes
            </div>
          </div>
        ))} {/* Display notes placed below overview */}
      </div>

      {/* Split screen layout */}
      <div className="calendar-content">
        {/* Left Box */}
        <div className="calendar-left-widget">
          {/* Month, Date, and Time on Top */}
          <h3 className="month-date">September 11</h3>
          <h4 className="time-display">6:00 AM</h4>
          {/* Class List */}
          <div className="class-list">
            <p><FaLeaf /> Compost: September 20, 6 AM</p>
            <p><FaRecycle /> Recycling: Every Thursday, 6 AM</p>
            <p><FaTrash /> Black Garbage: Every other Friday, 6 AM</p>
            {/* Display notes meant for the overview in the left widget as well */}
            {savedNotes.filter(note => note.placeBelowOverview).map((note) => (
              <div key={note.id} className="note-display left-widget-note">
                {note.text}
              </div>
            ))} {/* Display notes in the left widget */}
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
          <div className="calendar-grid">
            <div className="day-names">
              {daysOfWeek.map((day) => (
                <div key={day} className="day-header">
                  {day.slice(0, 2).toUpperCase()} {/* Showing only two letters */}
                </div>
              ))}
            </div>
            <div className="calendar-body">
              {daysInMonth.map((day) => (
                <div key={day} className="calendar-day">
                  {day}
                  {(day === 4 || day === 11 || day === 18 || day === 25) && (
                    <FaRecycle className="icon" title="Recycling Day" />
                  )} {/* Recycling days on every Thursday */}
                  {(day === 5 || day === 19) && (
                    <FaTrash className="icon trash-icon" title="Trash Day" />
                  )} {/* Trash days on every other Friday */}
                  {(day === 6 || day === 13 || day === 20 || day === 27) && (
                    <FaLeaf className="icon compost-icon" title="Compost Day" />
                  )} {/* Compost days on every Saturday */}
                </div>
              ))}
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
              onChange={handleNoteChange}
            />
            <label>
              <input
                type="checkbox"
                checked={placeNoteBelowOverview}
                onChange={handleTogglePlacement}
              />
              Place below monthly overview
            </label>
            <button className="save-btn" onClick={handleSaveNotes}>
              Save Notes
            </button>
          </div>
        )}
      </div>

      {/* Display notes at the bottom of the overall calendar */}
      <div className="calendar-bottom-notes">
        {savedNotes.filter(note => !note.placeBelowOverview).map((note) => (
          <div key={note.id} className="note-display">
            {note.text}
            <div className="note-actions">
              <FaEdit className="icon edit-icon" onClick={() => handleEditNote(note.id)} />
              <FaTrashAlt className="icon delete-icon" onClick={() => handleDeleteNote(note.id)} />
            </div>
          </div>
        ))} {/* Display notes at the bottom */}
      </div>
    </div>
  );
};

export default Calendar;
