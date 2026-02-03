from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.core.ws_manager import manager
import asyncio
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    logger.info(f"WS Client connected. Total: {len(manager.active_connections)}")
    try:
        while True:
            try:
                # Basic keep-alive and message handling
                data = await asyncio.wait_for(websocket.receive_text(), timeout=30.0)
                if data == "pong":
                    continue
            except asyncio.TimeoutError:
                await websocket.send_text("ping")
                continue
    except WebSocketDisconnect:
        logger.info("WS Client disconnected normally")
    except Exception as e:
        logger.error(f"WS Error: {e}")
    finally:
        manager.disconnect(websocket)
        logger.info(f"WS Client removed. Remaining: {len(manager.active_connections)}")
