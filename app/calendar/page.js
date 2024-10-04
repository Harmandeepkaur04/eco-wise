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

  return (
    <><div className="calendar-container">
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
      </div></>
  );
};

export default Calendar;
