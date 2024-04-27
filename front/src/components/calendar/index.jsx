import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ru'; // Для русской локали
import AddEventModal from './helpers/addModal';

const localizer = momentLocalizer(moment); // Инициализация локализации

const wateringEventsMock = [
    { title: 'Поливка роз', start: new Date(2024,4,15), end: new Date(2024,4,15) },
    { title: 'Поливка папоротников', start: new Date(2024,4,15), end: new Date(2024,4,15) },
    { title: 'Поливка гиацинтов', start: new Date(2024,4,15), end: new Date(2024,4,15) },
    { title: 'Поливка орхидей', start: new Date(2024,4,15), end: new Date(2024,4,15) },
    // Другие события о поливке...
];

const CalendarWidget = () => {
    const [events, setEvents] = useState([wateringEventsMock]); // Состояние для хранения событий
    const [showModal, setShowModal] = useState(false); // Состояние для отображения/скрытия модального окна
    const [selectedDate, setSelectedDate] = useState(null); // Состояние для хранения выбранной даты

    useEffect(() => {
        // Здесь вы можете загрузить события с вашего бэкенда и установить их в состояние events
        // Например, с помощью fetch или axios
    }, []);

    const handleAddEvent = (newEvent) => {
        // Добавляем новое событие к существующим событиям
        setEvents([...events, newEvent]);
        setShowModal(false);
    };

    return (
        <div>
            <h1>Календарь</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable
                onSelectSlot={(slotInfo) => {
                    setShowModal(true);
                    setSelectedDate(slotInfo.start);
                }}
            />
            {showModal && <AddEventModal onClose={() => setShowModal(false)} onAddEvent={(newEvent) => handleAddEvent({ ...newEvent, start: selectedDate, end: selectedDate })} />}
        </div>
    );
};

export default CalendarWidget;
