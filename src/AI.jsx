import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function PageQuestionInput() {
  const [text, setGeneratedText] = useState('');
  const [question, setQuestion] = useState('');

  const genAI = new GoogleGenerativeAI('YOUR API KEY');

  async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt1 = `${question} cevabını yaz`;

    const sonuc = await model.generateContent(prompt1);
    var cevap = await sonuc.response;
    var text = await cevap.text();
    setGeneratedText(text);
  }

  return (
    <>
      <div className="container">
          <div className="input-container">
          <h1 className='text-center m-5'>Sorunuzu Giriniz</h1>
            <div style={{marginBottom: '50vh'}}>
            <input 
              type='text'
              className="form-control" 
              placeholder="Sorunuz:"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></input>
            <button className="btn btn-primary btn-block mt-3" onClick={run}>Giriş</button>
            <div className='try'>
            </div>
            <br></br><br></br>
            <p>{text}</p>
            </div>
          </div>
        </div>
    </>
  );
}
