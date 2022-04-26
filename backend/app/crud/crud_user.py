from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.crud.base import CRUDBase
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    async def get_by_ident_doc(
        self, db: AsyncSession, *, ident_doc: str
    ) -> Optional[User]:
        result = await db.execute(select(User).filter(User.ident_doc == ident_doc))
        return result.scalars().first()


user = CRUDUser(User)
