from typing import Any

from sqlalchemy.orm import as_declarative, declared_attr


@as_declarative()
class Base:
    id: Any
    __name__: str
    # Gera __tablename__ automaticamente
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()