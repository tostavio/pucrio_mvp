from pydantic import BaseModel
from typing import Optional, List


class BookmarkSchema(BaseModel):
    """ Define como um bookmark deve ser representado
    """
    id: int = 1
    url: str = "https://www.google.com.br"
    description: str = "Google"
    created_at: str = "2022-07-01T00:00:00.000Z"
    updated_at: str = "2022-08-01T00:00:00.000Z"


class BookmarkFormSchema(BaseModel):
    """ Define como deve ser a estrutura que representa o formulário de
        cadastro de um novo Bookmark.
    """
    url: str = "https://www.google.com.br"
    description: Optional[str] = "Google"


class ListBookmarksResponseSchema(BaseModel):
    """ Define como deve ser a estrutura que representa a resposta da
        requisição de listagem de todos os bookmarks.
    """
    bookmarks: List[BookmarkSchema]


class DeleteBookmarkResponseSchema(BaseModel):
    """ Define como deve ser a estrutura que representa a resposta da
        requisição de remoção de um bookmark.
    """
    id: Optional[int]
    message:  Optional[str]


class DeleteBookmarkQuerySchema(BaseModel):
    """ Define como deve ser a estrutura que representa a query string
        da requisição de remoção de um bookmark.
    """
    bookmark_id: int


def get_bookmark(bookmark: BookmarkSchema):
    """ Retorna um bookmark no formato de dicionário
    """
    return {
        "id": bookmark.id,
        "url": bookmark.url,
        "description": bookmark.description,
        "created_at": bookmark.created_at,
        "updated_at": bookmark.updated_at
    }


def get_bookmarks(bookmarks: List[BookmarkSchema]):
    """ Retorna uma lista de bookmarks no formato de dicionário
    """

    result = []
    for bookmark in bookmarks:
        result.append({
            "id": bookmark.id,
            "url": bookmark.url,
            "description": bookmark.description,
            "created_at": bookmark.created_at,
            "updated_at": bookmark.updated_at
        })

    return {"bookmarks": result}
