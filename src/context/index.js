import { createContext, useEffect, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [data, setData] = useState([]);
    const [isDone, setIsDone] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const fetchData = async () => {
        setIsDone(false);
        const fetched = [];
        const offset = (page - 1) * 50;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=50`);
        const body = await response.json();
        const results = await body.results;
        let id = offset + 1;
        for (const e of results) {
            const images = [
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${id}.png`,
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`,
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`
            ];
            const capitalized = e.name.charAt(0).toUpperCase();
            const name = capitalized.concat(e.name.substring(1, e.name.length));
            fetched.push({ id, name, images });
            id++;
        }
        setData(prev => [...prev, ...fetched]);
        setIsDone(true);
        setTotalPages(Math.ceil(body.count / 50));
    }

    return (
        <DataContext.Provider value={{ data, isDone, page, setPage, totalPages }}>
            {children}
        </DataContext.Provider>
    );
}

export { DataContext, DataProvider };