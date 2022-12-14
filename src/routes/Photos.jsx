import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePhoto = (id) => {
    fetch("https://gallery-app-server.vercel.app/photos" + id, {
      method: "DELETE",
    }).then(() => setPhotos(photos.filter((photo) => photo.id !== id)));
  };

  const getPhotos = () => {
    try {
      const uploadDatas = fetch("https://gallery-app-server.vercel.app/photos")
        .then((res) => res.json())
        .then((d) => setPhotos(d));
      console.log(uploadDatas);
    } catch (error) {
      setError(error);
    }
  };

  const sortPhoto = (sort) => {
    fetch("https://gallery-app-server.vercel.app/photos" + sort)
      .then((res) => {
        return res.json();
      })
      .then((d) => setPhotos(d));
  };

  useEffect(() => {
    sortPhoto("?_sort=id&_order=desc");
  }, [sort, submited]);

  useEffect(() => {
    setLoading(false);
    getPhotos();
  }, []);

  if (error)
    return (
      <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
        Error!
      </h1>
    );

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => sortPhoto("?q=" + e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card key={photo.id} photo={photo} deletePhoto={deletePhoto} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
