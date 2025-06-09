import openai
import os
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

async def stream_summary(text: str):
    if not openai.api_key:
        raise HTTPException(status_code=500, detail="OpenAI API key not configured.")
    
    try:
        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": f"Summarize the following text:\n\n{text}"}],
            stream=True
        )

        async for chunk in response:
            if "choices" in chunk and len(chunk["choices"]) > 0:
                delta = chunk["choices"][0]["delta"]
                if "content" in delta:
                    yield f"{delta['content']}"

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI request failed: {e}")
