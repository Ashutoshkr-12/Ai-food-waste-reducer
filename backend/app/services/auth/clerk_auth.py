from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os
import httpx
from jose import jwt

security = HTTPBearer()

JWKS_URL = os.getenv("CLERK_JWKS_URL")
ISSUER  = os.getenv("CLERK_ISSUER")

async def get_jwks():

    async with httpx.AsyncClient() as client:
        res = await client.get(JWKS_URL)

    return res.json()


async def get_current_clerkUser(
        credentials: HTTPAuthorizationCredentials = Depends(security),
):
    token = credentials.credentials

    try:
        
        jwks = await get_jwks()

        payload = jwt.decode(
            token,
            jwks,
            algorithms=["RS256"],
            issuer=ISSUER,
            options={"verify_aud": False}
        )
        # print("payload from backend:",payload)

        clerk_id = payload.get("sub")
        email = None

        # if "email_addresses" in payload:
        #     email = payload["email_addresses"][0]["email_address"]

        return {
                "clerk_id": clerk_id,
                # "email": email
            }
        
    except Exception as e:
        print("Jwt Error:",e)
        raise HTTPException(
            status_code=401,
            detail="Invalid clerk token"
        )
