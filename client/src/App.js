import React, { useState, useEffect } from "react";
import axios from "axios";
import Film from "./Filmler/Film";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import FilmListesi from "./Filmler/FilmListesi";

export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          setMovieList(response.data);
          setSaved(response.data);
          console.log(response);

          // Perform any operations or transformations on each item.

          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
  };

  return (
    <Router>
      <div>
        <KaydedilenlerListesi list={[saved]} />
        <Switch>
          <Route path="/" exact>
            <FilmListesi movies={movieList} />
          </Route>
          <Route path="/filmler/:id">
            <Film movie={movieList.id} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
