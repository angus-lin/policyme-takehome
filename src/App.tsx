import { useState, useEffect } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts";
import ClassRequirements from "./ClassRequirements";

function App() {
  const [num, setNum] = useState<number>(0);
  const [shownClass, setShownClass] = useState("");
  const [skillPoints, setSkillPoints] = useState(10);
  const [usedPoints, setUsedPoints] = useState(0);

  let initialModifierState = {};
  for (let attribute of ATTRIBUTE_LIST) {
    initialModifierState[attribute] = 0;
  }

  const [modifiers, setModifiers] = useState(initialModifierState);

  let initialAttributeState = {};
  for (let attribute of ATTRIBUTE_LIST) {
    initialAttributeState[attribute] = 10;
  }
  const [attributes, setAttributes] = useState(initialAttributeState);

  let initialClasses = {};
  for (let playerClass of Object.keys(CLASS_LIST)) {
    initialClasses[playerClass] = false;
  }

  //allocated points
  let initialSkills = {};
  for (let skill of SKILL_LIST) {
    initialSkills[skill.name] = 0;
  }
  const [skills, setSkills] = useState(initialSkills);

  const [classIsAvailable, setClassIsAvailable] = useState(initialClasses);

  const updateState = (key, amount) => {
    setAttributes((prevStates) => ({
      ...prevStates,
      [key]: prevStates[key] + amount,
    }));
    let value = attributes[key] + amount;
    console.log(value);

    setModifiers((prevStates) => ({
      ...prevStates,
      [key]: Math.floor((value - 10) / 2),
    }));
  };

  const updateSkill = (skill, amount) => {
    if (!(usedPoints >= skillPoints)) {
      setUsedPoints(usedPoints + amount);
      setSkills((prevStates) => ({
        ...prevStates,
        [skill]: prevStates[skill] + amount,
      }));
    } else {
      alert("exceeded skill points");
    }
  };

  useEffect(() => {
    for (let playerClass of Object.keys(CLASS_LIST)) {
      let setClass = true;
      for (let attribute of ATTRIBUTE_LIST) {
        if (attributes[attribute] < CLASS_LIST[playerClass][attribute]) {
          setClass = false;
        }
      }
      setClassIsAvailable((prevStates) => ({
        ...prevStates,
        [playerClass]: setClass,
      }));
    }
  }, [attributes]);

  useEffect(() => {
    setSkillPoints(10 + 4 * modifiers["Intelligence"]);
  }, [modifiers["Intelligence"]]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>

      <section className="App-section">
        <div>
          {ATTRIBUTE_LIST.map((attribute) => (
            <div key={attribute}>
              <p>
                <span>{attribute} </span>
                <span> {attributes[attribute]}</span>

                <span> (Modifier:</span>
                <span>{modifiers[attribute]} )</span>
                <button onClick={() => updateState(attribute, 1)}>+</button>
                <button onClick={() => updateState(attribute, -1)}>-</button>
              </p>
            </div>
          ))}
        </div>
        <div>
          {Object.keys(CLASS_LIST).map((playerClass) => (
            <div key={playerClass}>
              <span
                className={
                  classIsAvailable[playerClass] ? "classUnavailable" : null
                }
                onClick={() => {
                  setShownClass(playerClass);
                }}
              >
                {playerClass}
              </span>
            </div>
          ))}
        </div>
        <div>
          {shownClass && (
            <ClassRequirements
              shownClass={shownClass}
              classList={CLASS_LIST[shownClass]}
            />
          )}
        </div>
        <div>
          <h2>Skills</h2>
          {SKILL_LIST.map((skill) => (
            <div key={skill.name}>
              <p>
                <span>{skill.name} </span>
                <span> {skills[skill.name]}</span>

                <span> (Modifier:</span>
                <span>
                  {skill.attributeModifier} ):
                  {modifiers[skill.attributeModifier]}
                </span>
                <button onClick={() => updateSkill(skill.name, 1)}>+</button>
                <button onClick={() => updateSkill(skill.name, -1)}>-</button>
                <span>Total:</span>
                <span>
                  {skills[skill.name] + modifiers[skill.attributeModifier]}
                </span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
