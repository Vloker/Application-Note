import React, { useState, useEffect } from 'react';
import Header from '../component/header/Header';
import Card from '../component/card/Card';
import Pencarian from '../component/inputan/Pencarian';
import { showFormattedDate } from '../utils';
import { getActiveNotes, addNote, archiveNote, deleteNote, getUserLogged } from '../utils/network';
import { useTheme } from '../context/context';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './.././styles/catatan.css';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Judul wajib diisi'),
    body: Yup.string().required('Catatan wajib diisi'),
});

function Catatan() {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);
    const { theme } = useTheme();
    const themeClass = theme ? 'dark-theme' : 'light-theme';
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            const { error, data } = await getUserLogged();
            if (!error) {
                setIsAuthenticated(true);
            } else {
                navigate('/');
            }
        };
        checkAuthentication();
    }, [navigate]);

    const formik = useFormik({
        initialValues: {
            title: '',
            body: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleClick(values);
        },
    });

    const handleClick = async (values) => {
        const { error, data } = await addNote(values);
        if (!error) {
            formik.resetForm();
            setNotes([...notes, data]);
        }
    };

    useEffect(() => {
        const fetchNotes = async () => {
            const { error, data } = await getActiveNotes();
            if (!error) {
                setNotes(data);
            }
        };
        fetchNotes();
    }, []);

    useEffect(() => {
        setFilteredNotes(
            notes.filter((note) =>
                note.title.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [notes, search]);

    const handleArchive = async (id) => {
        await archiveNote(id);
        setNotes(notes.filter((note) => note.id !== id));
    };

    const handleDelete = async (id) => {
        await deleteNote(id);
        setNotes(notes.filter((note) => note.id !== id));
    };

    return (
        <div id='Catatan' className={themeClass}>
            <Header
                title={'Catatan'}
                page={'/arsip'}
                text={'Arsip'}
                logout={'Logout'}
            />

            <main id='catatanaktif'>
                <form
                    id='formCatatan'
                    onSubmit={formik.handleSubmit}
                    className={themeClass}>

                    <p>Buat Catatan</p>

                    <input
                        className={themeClass}
                        placeholder='Judul catatan...'
                        value={formik.values.title}
                        type='text'
                        id='inputan'
                        name='title'
                        onChange={formik.handleChange}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <span className='error'>{formik.errors.title}</span>
                    ) : null}

                    <textarea
                        className='textareaForm'
                        id='textarea'
                        placeholder='Tuliskan catatan...'
                        name='body'
                        rows={9}
                        value={formik.values.body}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.body && formik.errors.body ? (
                        <span className='error'>{formik.errors.body}</span>
                    ) : null}

                    <button
                        className={themeClass}
                        id='buttonForm'
                        type='submit'>
                        Tambahkan Catatan
                    </button>
                </form>

                <Pencarian
                    type={'text'}
                    placeholder={'Cari Catatan...'}
                    text={'Catatan Aktif'}
                    value={search}
                    onchange={(e) => setSearch(e.target.value)}
                />

                <div id='card-container' className={themeClass}>
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((item) => (
                            <Card
                                key={item.id}
                                title={item.title}
                                id={item.id}
                                date={showFormattedDate(item.createdAt)}
                                text={item.body}
                                name={'Arsipkan'}
                                onclick={() => handleArchive(item.id)}
                                deleted={() => handleDelete(item.id)}
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

export default Catatan;
