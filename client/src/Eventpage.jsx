import axios from 'axios';
import React, { useState } from 'react';
import { FaFile } from 'react-icons/fa6';

const Eventpage = () => {
  const [pageType, setPageType] = useState('eventModel'); 
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [date, setDate] = useState("");
  const [authorName, setAuthorName] = useState("");        
  const [content, setContent] = useState("");              
  const [addedPhotos, setAddedphotos] = useState([]);
  const [plink, setPlink] = useState("");

  const handleModelChange = (ev) => {
    setPageType(ev.target.value);
  };

  const addpbylink = async (ev) => {
    ev.preventDefault();
    const { data: filename } = await axios.post("http://localhost:5000/upload-by-link", { link: plink });
    setAddedphotos(prev => [...prev, filename]);
    setPlink("");
  };

  const uploadPhoto = (ev) => {
    ev.preventDefault();
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photo", files[i]);
    }
    axios.post("http://localhost:5000/uploads", data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => {
      const { data: filenames } = res;
      setAddedphotos(prev => [...prev, filenames]);
    });
  };

  const addeventModel = async (ev) => {
    ev.preventDefault();
    const data = { title, subtitle, date, authorName, content, addedPhotos };
    await axios.post("http://localhost:5000/eventModel", data).then(() => {
      alert("Event added to eventModel. Thank you!");
      resetForm();
    });
  };

  const addOviyamModel = async (ev) => {
    ev.preventDefault();
    const data = { title, subtitle, date, authorName, content, addedPhotos };
    await axios.post("http://localhost:5000/oviyamModel", data).then(() => {
      alert("Event added to oviyamModel. Thank you!");
      resetForm();
    });
  };

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setDate("");
    setAuthorName("");
    setContent("");
    setPlink("");
    setAddedphotos([]);
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='mt-9 w-60 text-center bg-blue-300 py-3 text-2xl rounded-2xl'>Admin</h2>

      <div className='mt-5 w-96'>
        <label className='block mb-2 text-lg'>Select Event Type:</label>
        <select 
          value={pageType} 
          onChange={handleModelChange} 
          className='border-solid border-2 border-gray-500 px-4 py-2 rounded-xl w-full'
        >
          <option value="eventModel">Event Page</option>
          <option value="oviyamModel">Oviyam Page</option>
        </select>
      </div>

      {pageType === 'eventModel' ? (
        <form className='mt-10 h-auto border-solid border-2 border-sky-500 rounded-2xl flex flex-col justify-center items-center gap-6 p-10 w-8/12' onSubmit={addeventModel}>
          <input type='text' placeholder='Enter the Title' className='border-solid border-2 border-sky-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setTitle(ev.target.value)} />
          <input type='text' placeholder='Enter the SubTitle' className='border-solid border-2 border-sky-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setSubtitle(ev.target.value)} />
          <input type='date' placeholder='Enter the event date' className='border-solid border-2 border-sky-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setDate(ev.target.value)} />
          <input type='text' placeholder='Enter the Author Name' className='border-solid border-2 border-sky-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setAuthorName(ev.target.value)} />
          <textarea placeholder='Enter the Content' className='border-solid border-2 border-sky-500 w-9/12 px-2 py-2 rounded-xl' rows="10" onChange={(ev) => setContent(ev.target.value)} />
          <input type='submit' className='bg-blue-600 w-96 p-2 rounded-xl cursor-pointer text-white' />
        </form>
      ) : (
        <form className='mt-10 h-auto border-solid border-2 border-green-500 rounded-2xl flex flex-col justify-center items-center gap-6 p-10 w-8/12' onSubmit={addOviyamModel}>
          <input type='text' placeholder='Enter the Title' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setTitle(ev.target.value)} />
          <input type='text' placeholder='Enter the SubTitle' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setSubtitle(ev.target.value)} />
          <input type='date' placeholder='Enter the event date' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setDate(ev.target.value)} />
          <input type='text' placeholder='Enter the Author Name' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' onChange={(ev) => setAuthorName(ev.target.value)} />
          <textarea placeholder='Enter the Content' className='border-solid border-2 border-green-500 w-9/12 px-2 py-2 rounded-xl' rows="10" onChange={(ev) => setContent(ev.target.value)} />
          <input type='submit' className='bg-green-600 w-96 p-2 rounded-xl cursor-pointer text-white' />
        </form>
      )}

      {/* Photo Upload Section */}
      <div className='w-full gap-2 flex justify-center'>
        <input type='text' placeholder='Enter the link of the image' className='border-solid border-2 border-gray-500 w-8/12 px-2 py-2 rounded-xl' value={plink} onChange={(ev) => setPlink(ev.target.value)} />
        <button className='bg-blue-600 text-white px-2 py-2 rounded-xl cursor-pointer' onClick={addpbylink}>Add Photo</button>
      </div>
      <div className='flex gap-5'>
        <div className='flex items-center gap-3'>
          {addedPhotos.length > 0 && addedPhotos.map(link => (
            <div key={link}>
              <img src={'http://localhost:5000/uploads/' + link} alt='' className='rounded-xl' width="150px" height="100px" />
            </div>
          ))}
        </div>
        <label className='p-10 border-solid border-2 border-gray-500 rounded-xl cursor-pointer'>
          <input type='file' className='hidden' multiple onChange={uploadPhoto} />
          <div><FaFile /></div>
        </label>
      </div>
    </div>
  );
}

export default Eventpage;