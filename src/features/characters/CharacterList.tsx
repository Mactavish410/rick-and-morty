import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "./charactersSlice";
import type { RootState, AppDispatch } from "../../store/store";

const CharacterList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.characters
  );

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  return (
    <div>
      <h2>🧬 Персонажи Rick and Morty</h2>
      {loading && <p>⏳ Загрузка...</p>}
      {error && <p style={{ color: "red" }}>❌ Ошибка: {error}</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {data.map((character) => (
          <div key={character.id}>
            <img src={character.image} alt={character.name} width={150} />
            <p>{character.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;
