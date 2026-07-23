from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import StudioStat
from app.schemas import StatResponse

router = APIRouter(prefix="/stats", tags=["Stats"])

DEFAULT_STATS = [
    {"key": "released_games", "label": "Games Released", "value": 3, "suffix": "+"},
    {"key": "active_players", "label": "Active Players", "value": 50000, "suffix": "+"},
    {"key": "community_members", "label": "Community Members", "value": 12000, "suffix": "+"},
    {"key": "satisfaction_rate", "label": "Player Satisfaction", "value": 98, "suffix": "%"}
]

@router.get("/", response_model=list[StatResponse])
def get_stats(db: Session = Depends(get_db)):
    try:
        stats = db.query(StudioStat).all()
        if not stats:
            for stat_data in DEFAULT_STATS:
                stat = StudioStat(**stat_data)
                db.add(stat)
            db.commit()
            stats = db.query(StudioStat).all()
        return stats
    except Exception:
        return DEFAULT_STATS
