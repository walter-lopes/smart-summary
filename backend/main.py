from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from services.summary_service import stream_summary
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/summarize")
async def summarize(request: Request):
    data = await request.json()
    text = data.get("text")
    if not text:
        return {"error": "Text is required."}

    return StreamingResponse(stream_summary(text), media_type="text/plain")
