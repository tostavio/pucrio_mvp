from flask_openapi3 import OpenAPI, Info, Tag
from flask import redirect, request

from sqlalchemy.exc import IntegrityError

from model import Session, Bookmark
from schemas import *
from flask_cors import CORS

info = Info(title="bookmark API", version="1.0.0")
app = OpenAPI(__name__, info=info)
CORS(app)

# tags
home_tag = Tag(name="Documentação",
               description="Choose your documentation: Swagger, Redoc or RapiDoc")
bookmarks_tag = Tag(
    name="Bookmarks", description="Add, view and remove bookmarks")


@app.get('/', tags=[home_tag])
def home():
    """Redirect to /openapi, the page that allows you to choose the documentation style.
    """
    return redirect('/openapi')


@app.post('/bookmark', tags=[bookmarks_tag],
          responses={"200": BookmarkSchema, "400": ErrorSchema, "409": ErrorSchema})
def add_bookmark(form: BookmarkFormSchema):
    """Add a new bookmark to the database

    Return created bookmark.
    """
    bookmark = Bookmark(
        url=form.url,
        description=form.description)
    try:
        # benning, commiting a new bookmark and closing the session
        session = Session()
        session.add(bookmark)
        session.commit()
        return get_bookmark(bookmark), 200

    except IntegrityError as e:
        # Duplicate bookmark url
        message = f"Bookmark '{bookmark.url}' already exists '{e}'"
        print(e)
        return {"message": message}, 409

    except Exception as e:
        # Unexpected error
        message = "We couldn't save your bookmark, try again later"
        return {"message": message}, 400


@app.get('/bookmarks', tags=[bookmarks_tag],
         responses={"200": ListBookmarksResponseSchema, "404": ErrorSchema})
def get_bookmarks():
    """Get a list of all bookmarks

    Return a list of all bookmarks.
    """
    session = Session()
    # searching for all bookmarks
    bookmarks = session.query(Bookmark).all()

    if not bookmarks:
        # don't have any bookmarks
        return {"produtos": []}, 200
    else:
        # return all bookmarks
        return get_bookmarks(bookmarks), 200


@app.delete('/bookmark', tags=[bookmarks_tag],
            responses={"200": DeleteBookmarkResponseSchema, "404": ErrorSchema})
def delete_bookmarks(query: DeleteBookmarkQuerySchema):
    """Delete an existing bookmark from the database by id

    return id of deleted bookmark or error message.
    """
    bookmark_id = query.bookmark_id

    session = Session()
    # searching for the bookmark
    count = session.query(Bookmark).filter(
        Bookmark.id == bookmark_id).delete()
    session.commit()

    if count:
        # return id of deleted bookmark
        return {"id": bookmark_id}, 200
    else:
        # return error message
        return {"message": "Bookmark not found"}, 404
