from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from datetime import datetime
from typing import Union

from model import Base


class Bookmark(Base):
    __tablename__ = 'bookmark'

    id = Column(Integer, primary_key=True)
    url = Column(String(1000), unique=True)
    description = Column(String(100))
    created_at = Column(DateTime, default=datetime.now())
    updated_at = Column(DateTime, default=datetime.now())

    def __init__(self, url: str, description: Union[str, None] = url):
        """
        create a new bookmark.

        Arguments:
            url: bookmark url
            description: bookmark description
        """
        self.url = url
        if description:
            self.description = description
        else:
            self.description = url
