import { useState } from 'react';

const Doc = ({ info, deleteClick, saveClick }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [title, setTitle] = useState(info.title);
  const handleDeleteClick = () => {
    deleteClick(info.title);
  };
  const handleSaveClick = () => {
    saveClick(info.title, title);
    setIsHidden(true);
  };
  return (
    <div>
      <div id="title">{info.title}</div>
      <button onClick={handleDeleteClick}>Удалить</button>
     {isHidden ? (
       <div> <button onClick={(e) => setIsHidden(false)}> изменить</button> </div>
      ) : (
        <div>
        <button onClick={handleSaveClick}> сохранить </button>
        <input value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
      )} 

    </div>
  );
};

const App = () => {

    const [docsToRender, setDocsToRender] = useState([
    {
      title: 'Мат анализ',
    },
    {
      title: 'Философия',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    let newDoc = { title: inputValue };
    setDocsToRender((prevDocs) => [...prevDocs, newDoc]);
  };

  const deleteClick = (title) => {
    setDocsToRender((prevDocs) =>
      prevDocs.filter((doc) => doc.title !== title)
    );
  };
  const saveClick = (oldTitle, newTitle) => {
    let newDocs = docsToRender.map((doc) => {
     if (doc.title === oldTitle) {
      doc.title = newTitle;
     }
     return doc;
    })
    setDocsToRender(newDocs);
  }
  return (
    <div>
      {docsToRender.map((doc) => (
        <Doc info={doc} deleteClick={deleteClick} saveClick={saveClick}/>
      ))}
      <button onClick={handleClick}>Создать документ</button>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default App;
