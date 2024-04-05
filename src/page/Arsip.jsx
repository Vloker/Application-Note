import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/header/Header';
import Card from '../component/card/Card';
import Pencarian from '../component/inputan/Pencarian';
import { showFormattedDate } from '../utils';
import { getArchivedNotes, deleteNote, unarchiveNote, getActiveNotes } from '../utils/network';
import { useTheme } from '../context/context';
import './../styles/arsip.css';

function Arsip() {
    const [archivedNotes, setArchivedNotes] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);
    const { theme } = useTheme();
    const themeClass = theme ? 'dark-theme' : 'light-theme';
    const navigate = useNavigate();

    const handleChange = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await getArchivedNotes();
            if (response.error === false && Array.isArray(response.data)) {
                setArchivedNotes(response.data);
            } else {
                console.error("Error fetching archived notes:", response);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = archivedNotes.filter((item) => {
            return item.title.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredNotes(filtered);
    }, [search, archivedNotes]);

    const handleUnarchive = async (id) => {
        await unarchiveNote(id);
        const updatedData = await getArchivedNotes();
        if (Array.isArray(updatedData)) {
            setArchivedNotes(updatedData);
        }

        const activeNotesData = await getActiveNotes();
        if (activeNotesData.error === false && Array.isArray(activeNotesData.data)) {
            setFilteredNotes(activeNotesData.data);
        }
        navigate('/HalamanCatatan');
    };

    const handleDelete = async (id) => {
        await deleteNote(id);
        const updatedNotes = archivedNotes.filter((note) => note.id !== id);
        setArchivedNotes(updatedNotes);
    };

    return (
        <div id='arsip' className={themeClass}>
            <Header 
                title={'Arsip Catatan'}
                page={'/Halamancatatan'}
                text={'Catatan Aktif'}
                logout={'Logout'}/>
                
            <main className='arsipan'>
                <Pencarian 
                    type={'text'}
                    placeholder={'Cari Catatan'}
                    text={'Catatan Arsip'} 
                    value={search} 
                    onchange={handleChange} />

                <div className='card-container'>
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((item) => (
                            <Card
                                key={item.id}
                                title={item.title}
                                id={item.id}
                                date={showFormattedDate(item.createdAt)}
                                text={item.body}
                                onclick={() => handleUnarchive(item.id)}
                                deleted={() => handleDelete(item.id)}
                                name={'Pindahkan'}
                            />
                        ))
                    ) : (
                        <p>Data tidak tersedia</p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Arsip;
