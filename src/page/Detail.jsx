import React, { useState, useEffect } from 'react';
import Header from '../component/header/Header';
import { useParams } from 'react-router-dom';
import { getNote } from '../utils/network';
import { showFormattedDate } from '../utils';
import { useTheme } from '../context/context';
import './../styles/detail.css';

function Detail() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const { theme } = useTheme();
    const themeClass = theme ? 'dark-theme' : 'light-theme';

    useEffect(() => {
        const fetchData = async () => {
            const { error, data } = await getNote(id);
            if (!error) {
                setNote(data);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div id='detail' className={themeClass}>
            <Header title={"Detail Catatan"} logout={"Logout"} />
            <div className='article'>
                {note ? (
                    <>
                        <div id='title'>
                            <h2>{note.title}</h2>
                            <p>{showFormattedDate(note.createdAt)}</p>
                        </div>
                        <p>{note.body}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Detail;
