import { useState } from 'react';
import styles from './index.module.css';
import {aiHelp} from "../../api.js";

const HelpBot = () => {
    const [inputValue, setInputValue] = useState('');
    const [dialog, setDialog] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        try {
            const botResponse = await aiHelp(inputValue);
            const newDialog = [...dialog, { type: 'user', message: inputValue }, { type: 'bot', message: botResponse }];
            setDialog(newDialog);
            setInputValue('');
        } catch (error) {
            console.error('Failed to handle user input:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.dialog}>
                {dialog.map((item, index) => (
                    <div key={index} className={styles.messageWrapper}>
                        <div className={item.type === 'user' ? styles.userMessage : styles.botMessage}>{item.message}</div>
                    </div>
                ))}
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your query..."
                    value={inputValue}
                    onChange={handleInputChange}
                    className={styles.input}
                />
                <button type="submit" className={styles.submitButton}>Send</button>
            </form>
        </div>
    );
};

export default HelpBot;
