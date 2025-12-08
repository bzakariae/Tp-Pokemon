from flask import Flask, Response
import requests

app = Flask(__name__)

TYRADEX_BASE_URL = "https://tyradex.vercel.app/api/v1"

@app.get("/api/v1/pokemon/<int:pokemon_id>")
def get_pokemon(pokemon_id: int):
  
    r = requests.get(f"{TYRADEX_BASE_URL}/pokemon/25")

    return Response(
        r.content,
        status=r.status_code,
        content_type=r.headers.get("Content-Type", "application/json")
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
