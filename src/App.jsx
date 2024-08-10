import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ImCross } from "react-icons/im";

function App() {
  const [stars, setStars] = useState([]);
  const [value, setValue] = useState("");
  const [listItems, setListItems] = useState([]);

  const [checkedItems, setcheckedItems] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    setListItems((prev) => prev.concat(value));
    setcheckedItems((prev) => prev.concat(false));
  };

  const handleCheck = (index) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !checkedItems[index];
    setcheckedItems(newChecked);
  };

  const handleDelete = (index) => {
    const updateList = [...listItems];
    updateList.splice(index, 1);
    setListItems(updateList);
    const updateCheck = [...checkedItems];
    updateCheck.splice(index, 1);
    setcheckedItems(updateCheck);
  };

  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 100; i++) {
        const size = Math.random() * 2 + 1; // random size between 1px and 3px
        const left = Math.random() * 100; // random horizontal position
        const duration = Math.random() * 5 + 2; // random fall duration between 2s and 7s
        const delay = Math.random() * 5; // random delay

        starArray.push({
          id: i,
          size,
          left,
          duration,
          delay,
        });
      }
      setStars(starArray);
    };

    generateStars();
  }, []);

  return (
    <div className="starfall">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        ></div>
      ))}
      <div className="container-out">
        <div className="container-in">
          <div className="input-container">
            <input
              placeholder="Enter a task"
              type="text"
              value={value}
              onChange={handleChange}
            />
            <button onClick={handleClick} className="add-button">
              Add
            </button>
          </div>

          {listItems.map((items, index) => {
            return (
              <div key={index} className="list-container">
                <p className={checkedItems[index] ? "decoration" : ""}>
                  {items}
                </p>
                <div className="icons">
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={checkedItems[index]}
                    onChange={() => handleCheck(index)}
                  />
                  <ImCross
                    className="cross"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
