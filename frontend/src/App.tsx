import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { deleteBookmark, getBookmarks, postBookmarks } from "./service";
import { Bookmark, Bookmarks, INPUT_TYPES } from "./types";

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmarks | []>();
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [inputs, setInputs] = useState({
    description: "",
    url: "",
  });

  useEffect(() => {
    getBookmarks().then((response) => {
      console.log(response);
      setBookmarks(response?.bookmarks || []);
    });
  }, []);

  const addToBookmarks = useCallback((newBookmark: Bookmark) => {
    console.log("newBookmark", newBookmark);
    setBookmarks((oldBookmarks) => [...(oldBookmarks || []), newBookmark]);
  }, []);

  const deleteFromBookmarks = useCallback((id: number) => {
    setBookmarks((oldBookmarks) => [
      ...(oldBookmarks?.filter((oldBookmark) => oldBookmark.id !== id) || []),
    ]);
  }, []);

  const handleAddBookmark = useCallback(() => {
    setIsLoadingForm(true);
    postBookmarks(inputs).then((response) => {
      response && response.id && addToBookmarks(response);
      setIsLoadingForm(false);
    });
  }, [inputs, addToBookmarks]);

  const handleChangeDescription = useCallback(
    (event: ChangeEvent<HTMLInputElement>, inputType: INPUT_TYPES) => {
      setInputs((oldInputs) =>
        inputType === INPUT_TYPES.DESCRIPTION
          ? {
              ...oldInputs,
              description: event.target.value,
            }
          : {
              ...oldInputs,
              url: event.target.value,
            }
      );
    },
    []
  );

  const handleDeleteBookmarkClick = useCallback(
    (bookmark_id: number) => {
      setIsLoadingForm(true);
      deleteBookmark({ bookmark_id }).then((response) => {
        // if has id, call function to delete from bookmarks, else alert message
        (response?.id && deleteFromBookmarks(response.id)) ||
          (response?.message && alert(response.message));
        setIsLoadingForm(false);
      });
    },
    [deleteFromBookmarks]
  );

  return (
    <>
      <h1>Minha lista de favoritos</h1>
      <hr />
      <h2>Adicione novos favoritos</h2>
      <section>
        <div>
          <label htmlFor="description">Descrição do novo Favorito</label>
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            onChange={(e) =>
              handleChangeDescription(e, INPUT_TYPES.DESCRIPTION)
            }
          />
          <label htmlFor="url">URL do novo Favorito</label>
          <input
            type="text"
            name="url"
            placeholder="URL"
            onChange={(e) => handleChangeDescription(e, INPUT_TYPES.URL)}
          />
          <button
            type="button"
            disabled={isLoadingForm}
            onClick={handleAddBookmark}
          >
            Salvar Favorito
          </button>
        </div>
      </section>
      <hr />
      <h2>Meus Favoritos</h2>
      {(bookmarks?.length && bookmarks.length > 0 && (
        <section>
          <table id="bookmarks">
            <tr>
              <th>Descrição</th>
              <th>URL</th>
              <th>Ação</th>
            </tr>
            {bookmarks.map((bookmark) => (
              <tr key={bookmark.id}>
                <td>{bookmark.description}</td>
                <td>{bookmark.url}</td>
                <td>
                  {" "}
                  <button
                    type="button"
                    onClick={() => handleDeleteBookmarkClick(bookmark.id)}
                  >
                    Exluir
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </section>
      )) || <p>Nenhum favorito cadastrado</p>}
    </>
  );
}

export default App;
