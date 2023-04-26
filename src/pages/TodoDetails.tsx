import React, { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import styles from "@/styles/input_todo.module.css";
import useFetch from "use-http";

type Data = {
  title: string;
  description: string;
  difficulty: number;
};

export const TodoDetails: React.FC<{
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}> = ({ isEditing, setIsEditing }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("0");

  const json = {
    title: title,
    description: description,
    difficulty: difficulty,
  };
  const obj = JSON.stringify(json);

  const { get, post, response, loading, error } = useFetch("http://localhost:8002");

  async function addTodo() {
    const newTodo = await post("/task", json);
    if (response.ok) console.log("ok");
    setIsEditing(false);
  }


  return (
    <div hidden={!isEditing}>
      <div className={styles.overlay}>
        <div className={styles.module_content}>
          <input
            className={styles.input_title}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <div className={styles.input_checkbox}>
            <div>
              <label form="input_difficult1">1</label>
              <input
                className={styles.input_difficult}
                id="difficulty1"
                type="checkbox"
                value="difficulty1"
                onChange={(event) => setDifficulty(event.target.value)}
              />
            </div>

            <div>
              <label form="input_difficult2">2</label>
              <input
                className={styles.input_difficult2}
                id="difficulty2"
                type="checkbox"
                value="difficulty2"
                onChange={(event) => setDifficulty(event.target.value)}
              />
            </div>

            <div>
              <label form="input_difficult3">3</label>
              <input
                className={styles.input_difficult3}
                id="difficulty3"
                type="checkbox"
                value="difficulty3"
                onChange={(event) => setDifficulty(event.target.value)}
              />
            </div>
          </div>

          <input
            className={styles.input_text}
            type="text"
            value="description"
            onChange={(event) => setDescription(event.target.value)}
          />
          <div className={styles.button}>
            <button onClick={() => setIsEditing(false)}>close</button>
            <button onClick={() => addTodo()}>submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};