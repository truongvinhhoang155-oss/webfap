import json
from pathlib import Path

home = Path.home()
target_dir = home / ".gemini" / "antigravity"
target_file = target_dir / "mcp_config.json"

target_dir.mkdir(parents=True, exist_ok=True)

server_config = {
    "serverUrl": "https://mcp.supabase.com/mcp?project_ref=zpviietpqyposvixwkyy&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching&skip_elicitations=execute_sql,apply_migration"
}

data = {"mcpServers": {}}
if target_file.exists():
    try:
        with open(target_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            if "mcpServers" not in data:
                data["mcpServers"] = {}
    except Exception as e:
        print(f"Error reading existing file: {e}")

data["mcpServers"]["supabase"] = server_config

with open(target_file, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

print(f"Successfully updated {target_file}")
