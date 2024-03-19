import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';


const App = () => {
  const [editorHtml, setEditorHtml] = useState('');
  const [text, setGeneratedText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const genAI = new GoogleGenerativeAI('AIzaSyA2vdutgmI6H61Ero8-tAzEQe60OHWb41k');

  async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt1 = `${editorHtml} adları kullanarak bir senaryo yaz`;
    const sonuc = await model.generateContent(prompt1);
    const cevap = await sonuc.response;
    const text = await cevap.text();
    setGeneratedText(text);
  }

  async function run2() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt1 = `${editorHtml} adları kullanarak 10 tane senaryo konu önerisi yaz`;
    const sonuc = await model.generateContent(prompt1);
    const cevap = await sonuc.response;
    const text = await cevap.text();
    setGeneratedText(text);
  }
  async function run3() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt1 = `${editorHtml} bu senaryodaki sadece textleri kullanarak senaryoyu devam ettir çıktıyı da sadece text olarak ver`;
    const sonuc = await model.generateContent(prompt1);
    const cevap = await sonuc.response;
    const text = await cevap.text();
    setGeneratedText(text);
  }

  return (
    <>
      <div>
        <div className="app">
          <Dropdown className="text-center mt-2 dropdown-margin">
            <Dropdown.Toggle variant="secondary">
              {selectedOption ? selectedOption === 'character' ? 'Karakter' : 'Diyalog' : 'Seçenekler'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedOption('character')}>Karakter</Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedOption('dialogue')}>Diyalog</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className={selectedOption === 'character' ? 'center-text' : ''}>
            <ReactQuill
              theme="snow"
              value={editorHtml}
              onChange={handleChange}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                  [{ 'font': [] }],
                  [{ 'size': ['small', false, 'large', 'huge'] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ 'color': [] }, { 'background': [] }],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                  [{ 'align': [] }],
                  ['link', 'image', 'video'],
                  ['clean']
                ],
              }}
              style={{ fontWeight: selectedOption === 'character' ? 'bold' : 'normal' }}
            />
          </div>
          <div className="button-container">
            <button onClick={run} className="btn btn-outline-primary btn-animate mr-10">Senaryo Oluştur</button>
            <button onClick={run2} className="btn btn-outline-danger btn-animate" style={{ marginLeft: '10px' }}>Konu Önerileri Oluştur</button>
            <button onClick={run3} className="btn btn-outline-dark btn-animate" style={{ marginLeft: '10px' }}>Katkıda Bulun</button>
          </div>
          <div className="text-container" style={{ textAlign: selectedOption === 'character' ? 'center' : 'left', fontWeight: selectedOption === 'character' ? 'normal' : 'normal' }}>
            {text.split("\n").map((item, key) => (
              <p key={key}>{item}</p>
            ))}
          </div>
        </div>
        <div className='box'>
        </div>
      </div>
    </>
  );
};

export default App;
