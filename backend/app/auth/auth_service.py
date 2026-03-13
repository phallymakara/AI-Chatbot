import requests
from jose import jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPBearer
from dotenv import load_dotenv
import os

load_dotenv()

security = HTTPBearer()

TENANT_ID = os.getenv("AZURE_TENANT_ID")
CLIENT_ID = os.getenv("AZURE_CLIENT_ID")

OPENID_CONFIG_URL = f"https://login.microsoftonline.com/{TENANT_ID}/v2.0/.well-known/openid-configuration"

config = requests.get(OPENID_CONFIG_URL).json()

if "jwks_uri" not in config:
    raise Exception(f"Invalid OpenID configuration response: {config}")

JWKS_URI = config["jwks_uri"]


def verify_token(credentials=Security(security)):

    token = credentials.credentials

    try:

        header = jwt.get_unverified_header(token)

        key = None

        for k in jwks["keys"]:
            if k["kid"] == header["kid"]:
                key = k
                break

        payload = jwt.decode(
            token,
            key,
            algorithms=["RS256"],
            audience=CLIENT_ID
        )

        return payload

    except Exception:
        raise HTTPException(status_code=401, detail="Invalid authentication token")