import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddEventModal = ({ onClose, onAddEvent }) => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleSubmit = () => {
        const newEvent = {
            title,
            start: startDate,
            end: endDate,
        };
        onAddEvent(newEvent);
        setTitle('');
        setStartDate(new Date());
        setEndDate(new Date());
    };

    return (
        <div className="modal">
            <h2>Добавить событие</h2>
            <input type="text" placeholder="Название события" value={title} onChange={(e) => setTitle(e.target.value)} />
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="d.MM.yyyy HH:mm" />
            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="d.MM.yyyy HH:mm" />
            <button onClick={handleSubmit}>Добавить</button>
            <button onClick={onClose}>Закрыть</button>
        </div>
    );
};

export default AddEventModal;
