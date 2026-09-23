from fastapi.security import APIKeyHeader
from fastapi import Security, status, HTTPException
from dotenv import load_dotenv
import os

# load dev.env
# get api key from env
# check api key header
# write the function, if the api key is not found throw http expcetion status. 401, and add teh detail.
